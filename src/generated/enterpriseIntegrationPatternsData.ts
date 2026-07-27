export type EnterpriseIntegrationPatternCodeFile = {
  name: string;
  language: string;
  content: string;
};

export type EnterpriseIntegrationPattern = {
  slug: string;
  name: string;
  description: string;
  helps: string;
  link: string;
  tags: string[];
  category: string;
  index: number;
  icon: string;
  codeFiles: EnterpriseIntegrationPatternCodeFile[];
};

export type EnterpriseIntegrationPatternCategory = {
  category: string;
  items: EnterpriseIntegrationPattern[];
};

export const enterpriseIntegrationPatterns: EnterpriseIntegrationPattern[] = [
  {
    "slug": "command-message",
    "name": "Command Message",
    "description": "Command message invokes a remote procedure via messages to receive a response.",
    "helps": "<p>Ballerina supports a rich set of network protocol connectors which you can use to invoke remote applications.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/CommandMessage.html",
    "tags": [
      "Command Message",
      "Messaging",
      "Point-to-Point Channel"
    ],
    "category": "Message Construction",
    "index": 15,
    "icon": "/images/patterns/command-message.svg",
    "codeFiles": [
      {
        "name": "command-message.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype UserGroupCreateRequest record {|\n    string name;\n    string description;\n    string team_id;\n|};\n\ntype UserGroup record {\n    *UserGroupCreateRequest;\n    string id;\n    boolean is_usergroup;\n    string 'handle;\n    boolean is_external;\n    int date_create;\n    string created_by;\n    string user_count;\n};\n\ntype UserGroupCreationResponse record {\n    boolean ok;\n    UserGroup usergroup?;\n    string 'error?;\n};\n\nfinal http:Client slackClient = check new (\"http://api.slack.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    isolated resource function post createUserGroup(UserGroupCreateRequest userGroup)\n    returns UserGroupCreationResponse|error {\n        return slackClient->/api/usergroups\\.create.post(userGroup, mediaType = \"x-www-form-urlencoded\");\n    }\n}"
      }
    ]
  },
  {
    "slug": "document-message",
    "name": "Document Message",
    "description": "The document message transfers data from one application to another. The focus is on the data and reliability, not on the timing of the transfer.",
    "helps": "<p>Ballerina supports sending and receiving data in multiple formats such as JSON and XML over different protocols such as HTTP, GRPC, Kafka, etc. Depending on the protocol, Ballerina provides different reliability mechanisms. As an example, the Ballerina HTTP client supports retries, load balancing, and circuit breaking.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/DocumentMessage.html",
    "tags": [
      "Document Message",
      "Message Channel",
      "Message Endpoint",
      "Point-to-Point Channel",
      "Request-Reply"
    ],
    "category": "Message Construction",
    "index": 16,
    "icon": "/images/patterns/document-message.svg",
    "codeFiles": [
      {
        "name": "document-message.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerina/mime;\n\ntype CsvRequest record {|\n    string org;\n    string filename;\n|};\n\ntype ZohoResponse record {|\n    string status;\n    string code;\n    string message;\n    record {|\n        string file_id;\n        string created_time;\n    |} details;\n|};\n\nfinal http:Client zohoClient = check new (\"http://content.zohoapis.com.balmock.io\",\n    // Retry 3 times with 1 second interval for error codes 404, 408, and 500.\n    retryConfig = {count: 3, interval: 1, statusCodes: [404, 408, 500]}\n);\n\nservice /crm on new http:Listener(8080) {\n    resource function post bulkUploadLeads(CsvRequest csvRequest) returns ZohoResponse|error {\n        http:Request request = new;\n        request.addHeader(\"X-CRM_ORG\", csvRequest.org);\n        request.addHeader(\"feature\", \"bulk-write\");\n        request.setFileAsPayload(\"./ftpincoming/\" + csvRequest.filename, contentType = mime:MULTIPART_FORM_DATA);\n        return zohoClient->/crm/v5/upload.post(request);\n    }\n}"
      }
    ]
  },
  {
    "slug": "event-message",
    "name": "Event Message",
    "description": "Event message notifies other applications about something that happened. Unlike document message, the focus is on the timing of the message rather than the content.",
    "helps": "<p>Ballerina packages such as HTTP, Kafka, Websocket, etc., in the Ballerina library provide listeners, through which you can consume events from other applications. Each such package provides protocol-specific message sending APIs as well.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/EventMessage.html",
    "tags": [
      "Event Message",
      "Command Message",
      "Point-to-Point Channel"
    ],
    "category": "Message Construction",
    "index": 17,
    "icon": "/images/patterns/event-message.svg",
    "codeFiles": [
      {
        "name": "event-message.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerina/mime;\nimport ballerina/url;\n\ntype IncidentRequest record {\n    string phoneNo;\n    Incident incident;\n};\n\ntype Incident record {|\n    string description;\n    string date;\n    string time;\n|};\n\nconst FROM_NO = \"+15005550006\";\nconst API_VERSION = \"2010-04-01\";\nconst TWILIO_SID = \"VBC1849a56d52g41s4b2b2cc004c0027aa8\";\n\nfinal http:Client twilio = check new (\"http://api.twilio.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    resource function post incidents(IncidentRequest req) returns error? {\n        string body = string `Incident ${req.incident.description} reported: \n                              ${req.incident.date} at ${req.incident.time}.`;\n        http:Request twilioReq = new;\n        string payload = \"From=\" + check url:encode(FROM_NO, \"utf-8\") +\n                         \"&To=\" + check url:encode(req.phoneNo, \"utf-8\") +\n                         \"&Body=\" + check url:encode(body, \"utf-8\");\n        twilioReq.setTextPayload(payload, contentType = mime:APPLICATION_FORM_URLENCODED);\n        _ = check twilio->/[API_VERSION]/Accounts/[TWILIO_SID]/Messages\\.json.post(twilioReq,\n            targetType = http:Response\n        );\n    }\n}"
      }
    ]
  },
  {
    "slug": "correlation-identifier",
    "name": "Correlation Identifier",
    "description": "A correlation Identifier is a unique identifier that indicates which request message this reply is for.",
    "helps": "<p>Ballerina can send and receive messages over multiple protocols. Ballerina supports extracting and injecting information into the messages. The extracted information can be stored for later use as a correlation identifier. Module-level variables can be used for temporary storage. For a more robust solution, Ballerina provides a rich set of packages to interact with databases and key-value stores, such as SQL and Redis.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/CorrelationIdentifier.html",
    "tags": [
      "Correlation Identifier",
      "Request Reply",
      "Selective Consumer",
      "Messsage"
    ],
    "category": "Message Construction",
    "index": 20,
    "icon": "/images/patterns/correlation-identifier.svg",
    "codeFiles": [
      {
        "name": "correlation-identifier.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerinax/kafka;\n\ntype OrderRequest record {|\n    string orderId;\n    string name;\n    string address;\n    string phoneNumber;\n    OrderItem[] items;\n|};\n\ntype OrderItem record {|\n    string itemCode;\n    int quantity;\n    float unitPrice;\n|};\n\ntype InvoiceDetails record {|\n    string orderId;\n    string invoiceId;\n|};\n\nconst INVOICE_GENERATING = \"INVOICE_GENERATING\";\nconst INVOICE_GENERATED = \"INVOICE_GENERATED\";\n\ntype InvoiceGenerating record {|\n    INVOICE_GENERATING status = INVOICE_GENERATING;\n|};\n\ntype InvoiceGenerated record {|\n    INVOICE_GENERATED status = INVOICE_GENERATED;\n    string invoiceId;\n|};\n\nfinal map<InvoiceGenerating|InvoiceGenerated> processedOrders = {};\n\nservice /api/v1 on new http:Listener(8080) {\n\n    private final kafka:Producer kafkaPublisher;\n\n    function init() returns error? {\n        self.kafkaPublisher = check new (kafka:DEFAULT_URL);\n    }\n\n    resource function post process/'order(OrderRequest orderRequest) returns error? {\n        check self.kafkaPublisher->send({\n            topic: \"order-events\",\n            value: orderRequest\n        });\n        processedOrders[orderRequest.orderId] = {\n            \"status\": INVOICE_GENERATING\n        };\n    }\n}\n\nlistener kafka:Listener orderListener = new (kafka:DEFAULT_URL, {\n    groupId: \"order-group-id\",\n    topics: \"invoice-events\"\n});\n\nservice on orderListener {\n    remote function onConsumerRecord(InvoiceDetails[] invoices) returns error? {\n        foreach var invoice in invoices {\n            processedOrders[invoice.orderId] = {\n                \"status\": INVOICE_GENERATED,\n                \"invoiceId\": invoice.invoiceId\n            };\n        }\n    }\n}"
      }
    ]
  },
  {
    "slug": "message-sequence",
    "name": "Message Sequence",
    "description": "Message sequence sends the data as a sequence of messages and marks each message with sequence identification fields.",
    "helps": "<p>Ballerina supports loop constructs such as <code>while</code>, <code>foreach</code>, and <code>map</code>. These constructs can be used to iterate over data and send it in chunks. Program state can be kept in variables.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageSequence.html",
    "tags": [
      "Message Sequence",
      "Message Channel",
      "Message Endpoint",
      "Message"
    ],
    "category": "Message Construction",
    "index": 21,
    "icon": "/images/patterns/message-sequence.svg",
    "codeFiles": [
      {
        "name": "message-sequence.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerina/io;\n\nfinal http:Client s3Client = check new (\"http://noname-tech.s3.amazonaws.com.balmock.io\");\n\npublic function main() returns error? {\n    http:Response metaData = check s3Client->/employee_names.head();\n    int fileSize = check int:fromString(check metaData.getHeader(\"Content-Length\"));\n\n    check io:fileWriteBytes(\"./resources/employee_names.txt\", []);\n\n    int numberOfChunks = (fileSize + 10 - 1) / 10;\n    // Download the data chunk by chunk.\n    foreach int i in 0 ..< numberOfChunks {\n        map<string> headers = {Range: string `bytes=${10 * i}-${10 * (i + 1) - 1}`};\n        http:Response s3Response = check s3Client->/employee_names.get(headers = headers);\n        byte[] chunkData = check s3Response.getBinaryPayload();\n        check io:fileWriteBytes(\"./resources/employee_names.txt\", chunkData, io:APPEND);\n    }\n}"
      }
    ]
  },
  {
    "slug": "format-indicator",
    "name": "Format Indicator",
    "description": "The Format Indicator will identify the message format based on the version or structure and process it.",
    "helps": "<p>The <code>is</code> keyword in Ballerina distinguishes between structured types, aiding in distinguishing various message versions.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/FormatIndicator.html",
    "tags": [
      "Format Indicator",
      "Cannonical Data Model"
    ],
    "category": "Message Construction",
    "index": 23,
    "icon": "/images/patterns/format-indicator.svg",
    "codeFiles": [
      {
        "name": "format-indicator.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\npublic type PatientReqV1 record {|\n    \"1.0\" version = \"1.0\";\n    string firstName;\n    string lastName;\n    string dob;\n    string diagnosis;\n|};\n\npublic type PatientReqV2 record {|\n    \"2.0\" version = \"2.0\";\n    Patient patient;\n|};\n\ntype PatientReq PatientReqV1|PatientReqV2;\n\npublic type Patient record {|\n    string fullName;\n    string dob;\n    string diagnosis;\n|};\n\nfinal http:Client patientClient = check new (\"http://api.patients.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function post data/patient(PatientReq patintReq) returns error? {\n        Patient patient;\n        if patintReq is PatientReqV1 {\n            patient = {\n                dob: patintReq.dob,\n                fullName: patintReq.firstName + \" \" + patintReq.lastName,\n                diagnosis: patintReq.diagnosis\n            };\n        } else {\n            patient = {\n                dob: patintReq.patient.dob,\n                fullName: patintReq.patient.fullName,\n                diagnosis: patintReq.patient.diagnosis\n            };\n        }\n        _ = check patientClient->/patient.post(patient, targetType = http:Response);\n    }\n\n    resource function post patient(Patient patient) returns error? {\n        _ = check patientClient->/patient.post(patient, targetType = http:Response);\n    }\n}"
      }
    ]
  },
  {
    "slug": "content-based-router",
    "name": "Content-Based Router",
    "description": "Content-based router routes each message to the correct recipient based on message content.",
    "helps": "<p>Ballerina supports conditional logic with if-else and match statements. This can be used to route messages based on message content, header, or any custom logic. Ballerina type system supports union types (e.g., <code>Country</code> enum below is a union), which helps to define choices in a type-safe and readable manner.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/ContentBasedRouter.html",
    "tags": [
      "Content Based Router",
      "Message Filter",
      "Dynamtic Router"
    ],
    "category": "Message Routing",
    "index": 24,
    "icon": "/images/patterns/content-based-router.svg",
    "codeFiles": [
      {
        "name": "content-based-router.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype DhlUkResponse record {|\n    string url;\n    record {|\n        string id;\n        Status status;\n    |}[] shipments;\n|};\n\ntype DhlDpiResponse record {|\n    Status[] events;\n    string publicUrl;\n    string barcode;\n|};\n\ntype Status record {|\n    string statusCode;\n    string status;\n|};\n\nenum Country {\n    UK,\n    DE\n}\n\ntype TrackingRequest record {|\n    Country country;\n    string tracking_id;\n|};\n\nfinal http:Client dhl = check new (\"http://api.dhl.com.balmock.io\");\n\nservice /shipments on new http:Listener(8080) {\n\n    resource function post status(TrackingRequest request) returns string|error {\n        match request.country {\n            UK => {\n                DhlUkResponse response = check dhl->/parceluk/tracking/v1/shipments(trackingNumber = request.tracking_id);\n                return response.shipments[0].status.status;\n            }\n            DE => {\n                DhlDpiResponse response = check dhl->/dpi/tracking/v1/trackings/[request.tracking_id];\n                return response.events[0].status;\n            }\n            _ => {\n                return error(\"County not supported\");\n            }\n        }\n    }\n}"
      }
    ]
  },
  {
    "slug": "message-filter",
    "name": "Message Filter",
    "description": "Message filter neglects the uninterested messages based on criteria and publishes the filtered message to another channel.",
    "helps": "<p>Ballerina enables filtering messages using basic control structures such as if and switch statements.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Filter.html",
    "tags": [
      "Message Filter",
      "Message Channel",
      "Message Endpoint"
    ],
    "category": "Message Routing",
    "index": 25,
    "icon": "/images/patterns/message-filter.svg",
    "codeFiles": [
      {
        "name": "message-filter.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype Ticket record {|\n    string id;\n    string url;\n    string subject;\n    HIGH_PRIORITY|MEDUIM_PRIORITY|LOW_PRIORITY priority;\n|};\n\nconst HIGH_PRIORITY = 1;\nconst MEDUIM_PRIORITY = 2;\nconst LOW_PRIORITY = 3;\n\nfinal http:Client notificationChannel = check new (\"http://api.notification.channel.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function post ticket(Ticket ticket) returns error? {\n        if ticket.priority == 1 {\n            _ = check notificationChannel->/email/notify.post(ticket, targetType = http:Response);\n        }\n    }\n}"
      }
    ]
  },
  {
    "slug": "recipient-list",
    "name": "Recipient List",
    "description": "The recipient list pattern inspects an incoming message, determines the list of desired recipients, and forwards the message to all channels associated with the recipients in the list.",
    "helps": "<p>Ballerina can extract information from messages and execute logic based on that. Iteration constructs such as <code>foreach</code> and <code>while</code> and query expressions can be used to execute a given logic for each recipient. Ballerina supports sending multiple messages in a single incoming message.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/RecipientList.html",
    "tags": [
      "Recipient List",
      "Content Based Router",
      "Message Router"
    ],
    "category": "Message Routing",
    "index": 27,
    "icon": "/images/patterns/recipient-list.svg",
    "codeFiles": [
      {
        "name": "recipient-list.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype Recipient readonly & record {|\n    string recpientId;\n    string catergory;\n    string contact;\n    \"EMAIL\"|\"SMS\"|\"NOTIFICATION\" subscription;\n|};\n\ntype Message readonly & record {|\n    string subject?;\n    string body;\n    string signature?;\n|};\n\nfinal map<Recipient[]> recipientList = {};\n\nfinal http:Client emailManagerClient = check new (\"http://api.email.manager.com.balmock.io\");\nfinal http:Client smsManagerClient = check new (\"http://api.sms.manager.com.balmock.io\");\nfinal http:Client notificationManagerClient = check new (\"http://api.notification.manager.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function post quotes/[string catergory](Message message) returns error? {\n        foreach var {contact, subscription} in recipientList.get(catergory) {\n            match subscription {\n                \"EMAIL\" => {\n                    _ = check emailManagerClient->/send/[contact].post(message, targetType = http:Response);\n                }\n                \"SMS\" => {\n                    _ = check smsManagerClient->/send/[contact].post(message, targetType = http:Response);\n                }\n                \"NOTIFICATION\" => {\n                    _ = check notificationManagerClient->/send/[contact].post(message, targetType = http:Response);\n                }\n            }\n        }\n    }\n}"
      }
    ]
  },
  {
    "slug": "splitter",
    "name": "Splitter",
    "description": "Splitter splits the message into multiple messages, each containing one of the elements.",
    "helps": "<p>Ballerina supports arrays and maps as first-class data structures. These structures can be iterated over using <code>foreach</code> and query expressions.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Sequencer.html",
    "tags": [
      "Splitter",
      "Content Filter",
      "Event Message"
    ],
    "category": "Message Routing",
    "index": 28,
    "icon": "/images/patterns/splitter.svg",
    "codeFiles": [
      {
        "name": "splitter.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerina/mime;\nimport ballerina/url;\n\ntype ReminderRequest record {\n    string date;\n    Event[] events;\n};\n\ntype Event record {|\n    string eventName;\n    Attendee[] attendees;\n|};\n\ntype Attendee record {|\n    string name;\n    string number;\n|};\n\nconst FROM_NO = \"+15005550006\";\nconst TWILIO_SID = \"VAC1829a53d52f41b4b2b1cc003c0026aa8\";\nconst API_VERSION = \"2010-04-01\";\n\nfinal http:Client twilio = check new (\"http://api.twilio.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    resource function post reminders(ReminderRequest request) returns error? {\n        foreach var event in request.events {\n            foreach var attendee in event.attendees {\n                check sendReminder(attendee, event.eventName, request.date);\n            }\n        }\n    }\n}\n\nfunction sendReminder(Attendee attendee, string eventName, string date) returns error? {\n    string body = string `Hi ${attendee.name}, looking forward to meet you at the ${eventName} on ${date}`;\n    string payload = \"From=\" + check url:encode(FROM_NO, \"utf-8\") +\n                     \"&To=\" + check url:encode(attendee.number, \"utf-8\") +\n                     \"&Body=\" + check url:encode(body, \"utf-8\");\n    http:Request twilioReq = new;\n    twilioReq.setTextPayload(payload, contentType = mime:APPLICATION_FORM_URLENCODED);\n    _ = check twilio->/[API_VERSION]/Accounts/[TWILIO_SID]/Messages\\.json.post(twilioReq, targetType = http:Response);\n}"
      }
    ]
  },
  {
    "slug": "aggregator",
    "name": "Aggregator",
    "description": "Aggregator patiently collects a sequence of messages and combines them once all have been received.",
    "helps": "<p>Ballerina provides convenient map and table data structures for temporary message storage. Ballerina provides robust support for distributed storage with the Redis package. Additionally, it offers seamless integration with various SQL and NoSQL databases for persistent data storage. Ballerina's cache package is an efficient in-memory cache solution that includes automatic cleanup mechanisms.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Aggregator.html",
    "tags": [
      "Aggregator"
    ],
    "category": "Message Routing",
    "index": 29,
    "icon": "/images/patterns/aggregator.svg",
    "codeFiles": [
      {
        "name": "aggregator.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\nfinal map<json[]> partialSurveys = {};\n\nfinal http:Client formSubmitClient = check new (\"http://api.surveyme.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function post survey/[string id](@http:Header string userId, @http:Payload json formData) returns error? {\n        json[]? surveyData = partialSurveys[userId];\n        if surveyData == () {\n            json[] newSurvey = [formData];\n            partialSurveys[userId] = newSurvey;\n        } else {\n            surveyData.push(formData);\n            if surveyData.length() == 3 {\n                _ = check formSubmitClient->/survey/[id]/submit.post({userId: surveyData}, targetType = http:Response);\n                _ = partialSurveys.remove(userId);\n            }\n        }\n    }\n}"
      }
    ]
  },
  {
    "slug": "resequencer",
    "name": "Resequencer",
    "description": "Resequencer reorders the sequence of messages received in the incorrect order.",
    "helps": "<p>Ballerina provides convenient map and table data structures for temporary message storage. The query expressions enable sorting arrays based on one or more item attributes.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Resequencer.html",
    "tags": [
      "Resequencer"
    ],
    "category": "Message Routing",
    "index": 30,
    "icon": "/images/patterns/resequencer.svg",
    "codeFiles": [
      {
        "name": "resequencer.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype Approval record {\n    TEAM_LEAD|MANAGER|SENIOR_MANAGER leadLevel;\n    int score;\n    int nextPromotionLevel;\n};\n\nconst TEAM_LEAD = 1;\nconst MANAGER = 2;\nconst SENIOR_MANAGER = 3;\n\nfinal map<Approval[]> incompleteApprovals = {};\n\nfinal http:Client hrClient = check new (\"http://api.wso2hr.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function post employees/[string emoloyeeId]/approval(Approval approvalReq) returns error? {\n        Approval[]? approvals = incompleteApprovals[emoloyeeId];\n        if approvals == () {\n            incompleteApprovals[emoloyeeId] = [approvalReq];\n            return;\n        }\n        approvals.push(approvalReq);\n        if approvals.length() < 3 {\n            return;\n        }\n        from Approval approval in approvals\n        order by approval.leadLevel\n        do {\n            _ = check hrClient->/promotions/employees/[emoloyeeId]/approval.post(approval, targetType = json);\n        };\n        _ = incompleteApprovals.remove(emoloyeeId);\n    }\n}"
      }
    ]
  },
  {
    "slug": "composed-message-processor",
    "name": "Composed Message Processor",
    "description": "Composed Message Processor splits the message up, routes the sub-messages to the appropriate destinations and re-aggregates the responses back into a single message.",
    "helps": "<p>Ballerina has <code>foreach</code>, <code>while</code> and query expressions to iterate over data. During iteration, Ballerina can send and receive messages. Ballerina can extract, manipulate and store data in messages using variables.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/DistributionAggregate.html",
    "tags": [
      "Composed Message Processor",
      "Aggregator",
      "Content Based Router"
    ],
    "category": "Message Routing",
    "index": 31,
    "icon": "/images/patterns/composed-message-processor.svg",
    "codeFiles": [
      {
        "name": "composed-message-processor.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype SalesByStateRequest record {|\n    string[] states;\n|};\n\ntype SalesByState record {|\n    decimal revenue;\n    decimal operatingExpenses;\n    int production;\n    int totalEmployees;\n|};\n\ntype AggregratedSales record {|\n    map<decimal> revenueByState = {};\n    decimal totalRevenue = 0.0;\n    decimal maxRevenue = 0.0;\n    string maxRevenueState = \"\";\n    map<decimal> operatingExpensesByState = {};\n    decimal totalOperatingExpenses = 0.0;\n    int totalProduction = 0;\n    map<int> productivityByState = {};\n|};\n\nfinal map<http:Client> stateRoutes = {\n    Texas: check new (\"http://api.texas.office.com.balmock.io\"),\n    Ohio: check new (\"http://api.ohio.office.com.balmock.io\"),\n    Florida: check new (\"http://api.florida.office.com.balmock.io\")\n};\n\nservice /api/v1 on new http:Listener(8080) {\n    resource function post dashboard(SalesByStateRequest salesRequest) returns AggregratedSales|error {\n        AggregratedSales summary = {};\n        foreach string state in salesRequest.states {\n            http:Client? stateClient = stateRoutes[state];\n            if stateClient == () {\n                return error(\"Invalid state provided\");\n            }\n            SalesByState salesByState = check stateClient->/sales();\n            aggregateSales(summary, state, salesByState);\n        }\n        return summary;\n    }\n}\n\nfunction aggregateSales(AggregratedSales summary, string state, SalesByState salesByState) {\n    summary.revenueByState[state] = salesByState.revenue;\n    summary.totalRevenue += salesByState.revenue;\n    summary.operatingExpensesByState[state] = salesByState.operatingExpenses;\n    summary.totalOperatingExpenses += salesByState.operatingExpenses;\n    summary.totalProduction += salesByState.production;\n    summary.maxRevenueState = summary.maxRevenue < salesByState.revenue ? state : summary.maxRevenueState;\n    summary.maxRevenue = summary.maxRevenue < salesByState.revenue ? salesByState.revenue : summary.maxRevenue;\n    summary.productivityByState[state] = salesByState.production / salesByState.totalEmployees;\n}"
      }
    ]
  },
  {
    "slug": "scatter-gather",
    "name": "Scatter-Gather",
    "description": "Scatter-gather broadcasts a message to multiple recipients and re-aggregates the responses back into a single message.",
    "helps": "<p>Ballerina has a lightweight <a href=\"/learn/by-example/named-workers/\">concurrency</a> model with built-in syntax support. This helps to send messages parallelly and to wait on aggregation. Query expressions are convenient for transforming, ordering, and filtering the aggregated data.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/BroadcastAggregate.html",
    "tags": [
      "Scatter-Gather",
      "Aggregator",
      "Message Channel",
      "Message Endpoint",
      "Message Router",
      "Message"
    ],
    "category": "Message Routing",
    "index": 32,
    "icon": "/images/patterns/scatter-gather.svg",
    "codeFiles": [
      {
        "name": "scatter-gather.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype CarRental record {|\n    string carType;\n    string price;\n    string resultLink;\n    string vendor;\n|};\n\ntype AvisResponse record {\n    record {\n        *CarRental;\n    }[] result;\n};\n\nfinal http:Client hotwireEP = check new (\"http://api.hotwire.com.balmock.io\");\nfinal http:Client avisEP = check new (\"http://api.avis.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function get vehicles(string dropOffDateTime, string dropOffLocation, string pickupDateTime,\n            string pickupLocation) returns map<CarRental[]>|error {\n\n        worker hotwire returns CarRental[]|error {\n            http:Response hotwireResponse = check hotwireEP->/v1/search/car.get(pickup = pickupLocation,\n                dest = dropOffLocation, startDate = pickupDateTime, endDate = dropOffDateTime\n            );\n            return transformHotwireResponse(check hotwireResponse.getXmlPayload());\n        }\n\n        worker avis returns CarRental[]|error {\n            AvisResponse avisResponse = check avisEP->/cars/catalog/v1/vehicles/rates.get(brand = \"Avis\",\n                country_code = \"US\", dropOff_date = dropOffDateTime, dropoff_location = dropOffLocation,\n                pickup_date = pickupDateTime, pickup_location = pickupLocation\n            );\n            return transformAvisResponse(avisResponse);\n        }\n\n        var responses = wait {hotwire, avis};\n        return map from var [vendor, carRental] in responses.entries()\n            where carRental !is error\n            select [vendor, carRental];\n    }\n}\n\nfunction transformHotwireResponse(xml response) returns CarRental[] {\n    return from xml item in response/<Response>/<Car>\n        select {\n            carType: (item/<CarType>).data(),\n            price: (item/<Price>).data(),\n            resultLink: (item/<ResultLink>).data(),\n            vendor: \"Hotwire\"\n        };\n}\n\nfunction transformAvisResponse(AvisResponse response) returns CarRental[] {\n    return from var {carType, price, resultLink, vendor} in response.result\n        select {carType, price, resultLink, vendor};\n}"
      }
    ]
  },
  {
    "slug": "routing-slip",
    "name": "Routing Slip",
    "description": "Route the message to the next component according to the sequence of processing steps specified in a routing slip.",
    "helps": "<p>Ballerina excels in enabling the seamless integration of diverse services with inherent concurrent support, as well as in data binding, type enforcement, and native error-handling capabilities.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/RoutingTable.html",
    "tags": [
      "Routing Slip",
      "Message Channel",
      "Message Endpoint",
      "Message Router"
    ],
    "category": "Message Routing",
    "index": 33,
    "icon": "/images/patterns/routing-slip.svg",
    "codeFiles": [
      {
        "name": "routing-slip-main.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype PaymentRequest record {|\n    string mobileNumber;\n    string customerName;\n    float totalAmount;\n    string storeCode;\n    record {}[] items;\n|};\n\ntype PaymentStatus record {|\n    string status;\n    record {\n        float totalPoints;\n        float redeemedAmount;\n        float totalAmount;\n    } details;\n|};\n\ntype Message record {|\n    *PaymentRequest;\n    string storeCode;\n    string[] routingSlip = [];\n|};\n\ntype Points record {\n    float loyaltyPoints = 0.0;\n    float mobilePoints = 0.0;\n};\n\nservice /api/v1 on new http:Listener(8080) {\n    resource function post payments(PaymentRequest request) returns PaymentStatus|error {\n        string[] routingSlip = check lookupMessageSlip(request);\n        Message message = {...request, routingSlip: routingSlip};\n        Points points = {};\n        if message.routingSlip.length() > 0 {\n            http:Client pointHandler = check new (\"http://localhost:8081/loyaltyPoints\");\n            json payload = {\n                storeCode: message.storeCode,\n                mobileNumber: message.mobileNumber,\n                routingSlip: message.routingSlip\n            };\n            points = check pointHandler->/points.post(payload);\n        }\n        return checkout(message, points);\n    }\n}\n\nfunction checkout(Message message, Points points) returns PaymentStatus {\n    float totalPoints = points.loyaltyPoints + points.mobilePoints;\n    return {\n        status: \"SUCCESS\",\n        details: {\n            totalPoints: totalPoints,\n            redeemedAmount: totalPoints * 50,\n            totalAmount: message.totalAmount - (totalPoints * 50)\n        }\n    };\n}\n\nfunction lookupMessageSlip(PaymentRequest request) returns string[]|error {\n    http:Client openLoyalty = check new (\"http://openloyalty.com.balmock.io\");\n    anydata|error customer = openLoyalty->/api/[request.storeCode]/member/'check/get();\n    string[] routingSlip = [];\n    if customer is anydata {\n        routingSlip.push(\"CustomerLoyaltyPoints\");\n    }\n    if check isRegisteredToPointsService(request.mobileNumber) {\n        routingSlip.push(\"MobilePoints\");\n    }\n    return routingSlip;\n}\n\nfunction isRegisteredToPointsService(string mobileNumber) returns boolean|error {\n    http:Client openLoyalty = check new (\"http://mob.points.hub.com.balmock.io\");\n    anydata|error memberCheck = openLoyalty->/api/[mobileNumber]/member/'check/get();\n    return memberCheck is error ? false : true;\n}"
      },
      {
        "name": "loyalty-point-service.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype Request record {|\n    string storeCode;\n    string mobileNumber;\n    string[] routingSlip;\n|};\n\ntype Points record {|\n    float loyaltyPoints = 0.0;\n    float mobilePoints = 0.0;\n    float crypto = 0.0;\n|};\n\nservice /loyaltyPoints on new http:Listener(8081) {\n    resource function post points(Request request) returns Points|error {\n        Points totalPoints = {};\n        foreach string process in request.routingSlip {\n            match process {\n                \"CustomerLoyaltyPoints\" => {\n                    totalPoints.loyaltyPoints = check getShopLoyaltiPoints(request);\n                }\n                \"MobilePoints\" => {\n                    totalPoints.mobilePoints = check getMobilePoints(request);\n                }\n                \"Crypto\" => {\n                    totalPoints.crypto = check getCrypto(request);\n                }\n            }\n        }\n        return totalPoints;\n    }\n}\n\nfunction getShopLoyaltiPoints(Request request) returns float|error {\n    http:Client openLoyalty = check new (\"http://openloyalty.customer.com.balmock.io\");\n    record {float loyaltyPoints;} points = check openLoyalty->/api/[request.storeCode]/redemption/[request.mobileNumber].get();\n    return points.loyaltyPoints;\n}\n\nfunction getMobilePoints(Request request) returns float|error {\n    http:Client mobPoints = check new (\"http://mob.points.com.balmock.io\");\n    record {float mobilePoints;} points = check mobPoints->/api/[request.mobileNumber]/redemption.get();\n    return points.mobilePoints;\n}\n\nfunction getCrypto(Request request) returns float|error {\n    http:Client crypto = check new (\"http://crypto.com.balmock.io\");\n    record {float crypto;} points = check crypto->/api/[request.mobileNumber].get();\n    return points.crypto;\n}"
      }
    ]
  },
  {
    "slug": "process-manager",
    "name": "Process Manager",
    "description": "The process manager orchestrates a sequence of steps that are not known at design time.",
    "helps": "<p>Ballerina provides control flow constructs such as <code>if</code>-<code>else</code> and <code>match</code> statements to implement complex process flows.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/ProcessManager.html",
    "tags": [
      "Process Manager",
      "Command Message",
      "Aggregator",
      "Point-to-Point Channel"
    ],
    "category": "Message Routing",
    "index": 34,
    "icon": "/images/patterns/process-manager.svg",
    "codeFiles": [
      {
        "name": "process-manager.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype OrderRequest record {|\n    string email;\n    Address address;\n    OrderItemRequest[] orderItems;\n|};\n\ntype OrderResponse record {|\n    string email;\n    string currency;\n    float total;\n    Address address;\n    OrderItemResponse[] orderItems;\n    string trackingNumber;\n|};\n\ntype Address record {|\n    string fullName;\n    string address1;\n    string phone;\n    string city;\n    string country;\n|};\n\ntype OrderItemRequest record {\n    string itemName;\n    int quantity;\n};\n\ntype OrderItemResponse record {|\n    string itemName;\n    int quantity;\n    float price;\n    string currencyCode;\n|};\n\ntype ShipmentRequest record {|\n    float amount;\n    string currency;\n    string personName;\n    string email;\n    DHLAddress|FedexAddress address;\n|};\n\ntype FedexAddress record {|\n    string address1;\n    string city;\n    string country;\n    string phoneNumber;\n|};\n\ntype DHLAddress record {|\n    string name;\n    *FedexAddress;\n|};\n\ntype FedexResponse record {|\n    string transactionId;\n    string trackingNumber;\n|};\n\ntype DHLResponse record {|\n    string trackingNumber;\n|};\n\nfinal http:Client shopify = check new (\"http://BlackwellsBooks.myshopify.com.balmock.io\");\nfinal http:Client dhlExpress = check new (\"http://express.api.dhl.com.balmock.io\");\nfinal http:Client fedEx = check new (\"http://api.fedex.com.balmock.io\");\nfinal http:Client sendgrid = check new (\"http://api.sendgrid.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    resource function post orders(OrderRequest orderReq) returns error? {\n        OrderResponse response = check shopify->/admin/api/orders\\.json.post(orderReq);\n        string trackingNumber;\n        if response.address.country == \"United States\" {\n            FedexResponse fedexResp = check createFedexShipment(response);\n            trackingNumber = fedexResp.trackingNumber;\n        } else {\n            DHLResponse dhlResp = check creeateDhlShipment(response);\n            trackingNumber = dhlResp.trackingNumber;\n        }\n        var _ = start sendConfirmationMail(response.address.fullName, response.email, trackingNumber);\n    }\n}\n\nfunction createFedexShipment(OrderResponse response) returns FedexResponse|error {\n    ShipmentRequest fedexReq = {\n        amount: response.total,\n        currency: response.currency,\n        personName: response.address.fullName,\n        email: response.email,\n        address: {\n            address1: response.address.address1,\n            city: response.address.city,\n            country: response.address.country,\n            phoneNumber: response.address.phone\n        }\n    };\n\n    return check fedEx->/api/en\\-us/catalog/ship/v1/shipments.post(fedexReq);\n\n}\n\nfunction creeateDhlShipment(OrderResponse response) returns DHLResponse|error {\n    ShipmentRequest dhlReq = {\n        amount: response.total,\n        currency: response.currency,\n        personName: response.address.fullName,\n        email: response.email,\n        address: {\n            name: response.address.fullName,\n            address1: response.address.address1,\n            city: response.address.city,\n            country: response.address.country,\n            phoneNumber: response.address.phone\n        }\n    };\n\n    return check dhlExpress->/mydhlapi/shipments.post(dhlReq);\n}\n\nfunction sendConfirmationMail(string name, string email, string trackingNumber) returns error? {\n    string body = string `<p>Hello ${name}!</p><p>Your Order has been shipped. ` +\n                  string `Track your order using ${trackingNumber}</p>`;\n    var mailReq = {\n        toInfo: email,\n        fromInfo: \"orders@blackwell.com\",\n        subject: \"Order Confirmation\",\n        content: body\n    };\n\n    _ = check sendgrid->/v3/mail/send.post(mailReq, targetType = json);\n}"
      }
    ]
  },
  {
    "slug": "envelope-wrapper",
    "name": "Envelope Wrapper",
    "description": "Envelope Wrapper wraps application data inside an envelope that is compliant with the messaging infrastructure.",
    "helps": "<p>Ballerina provides a rich set of libraries to interact with various messaging protocols. Ballerina allows you to extract information from messages and create new messages, manipulating data in both the body and the header.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/EnvelopeWrapper.html",
    "tags": [
      "Envelope Wrapper",
      "Content Enricher",
      "Message Channel",
      "Message"
    ],
    "category": "Message Transformation",
    "index": 36,
    "icon": "/images/patterns/envelope-wrapper.svg",
    "codeFiles": [
      {
        "name": "envelope-wrapper.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype RefundRequest record {|\n    string request_id;\n    string email;\n    string client_id;\n    string capture_id;\n|};\n\ntype PaypalRespose record {|\n    string status;\n    string message;\n|};\n\nfinal http:Client paypalClient = check new (\"http://api-m.sandbox.paypal.com.balmock.io\");\nfinal string encodedHeader = {alg: \"none\"}.toString().toBytes().toBase64();\n\nservice /paypal on new http:Listener(8080) {\n    resource function post refund(RefundRequest refundReq) returns PaypalRespose|error {\n        // Generate PayPal-Auth-Assertion.\n        string authAssertionValue = getAuthAssertionValue(refundReq.client_id, refundReq.email);\n\n        http:Request request = new;\n        request.addHeader(\"PayPal-Request-Id\", refundReq.request_id);\n        request.addHeader(\"PayPal-Auth-Assertion\", authAssertionValue);\n        return paypalClient->/v2/payments/captures/[refundReq.capture_id]/refund.post(request);\n    }\n}\n\nisolated function getAuthAssertionValue(string client_id, string email) returns string {\n    map<string> payload = {\n        iss: client_id,\n        payer_id: email\n    };\n    string encodedPayload = payload.toString().toBytes().toBase64();\n    return string `${encodedHeader}.${encodedPayload}.`;\n}"
      }
    ]
  },
  {
    "slug": "content-enricher",
    "name": "Content Enricher",
    "description": "Content enricher adds data that was not sent by the original sender to the message.",
    "helps": "<p>Ballerina enables additional lookups to enrich the message, such as database lookups, REST API calls, etc. Spread operator (...) helps to create new records out of existing records while enriching them with additional data.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/DataEnricher.html",
    "tags": [
      "Content Enricher",
      "Message Channel",
      "Message Endpoint",
      "Message"
    ],
    "category": "Message Transformation",
    "index": 37,
    "icon": "/images/patterns/content-enricher.svg",
    "codeFiles": [
      {
        "name": "content-enricher.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype BankAccountReq record {|\n    string name;\n    string accountNumber;\n    string routingNumber;\n    string? country;\n|};\n\ntype IbanRequest record {|\n    \"json\"|\"xml\" format = \"json\";\n    string country_iso;\n    string nid;\n|};\n\ntype IbanResponse record {\n    string bank_code;\n};\n\ntype BankAccount record {\n    *BankAccountReq;\n    string id;\n    string? bankCode;\n};\n\nfinal http:Client iban = check new (\"http://api.iban.com.balmock.io\");\nfinal http:Client intuit = check new (\"http://api.intuit.com.balmock.io\");\n\nservice /finance on new http:Listener(8080) {\n\n    resource function post customers/[int id]/accounts(BankAccountReq req) returns BankAccount|error {\n        IbanRequest ibanReq = {country_iso: req.country ?: \"US\", nid: req.accountNumber};\n        IbanResponse ibanRes = check iban->/clients/api/banksuite/nid.post(ibanReq);\n        return check intuit->/quickbooks/v4/customers/[id]/bank\\-accounts.post({...req, bankCode: ibanRes.bank_code});\n    }\n}"
      }
    ]
  },
  {
    "slug": "content-filter",
    "name": "Content Filter",
    "description": "The content filter removes data from the original message and can also be employed to simplify the message structure.",
    "helps": "<p>Ballerina excels at manipulating data and handling diverse formats, structures, and transformations. The <a href=\"/learn/by-example/query-expressions/\">query expression</a> (<code>from</code> keyword) is useful for transforming messages. The <code>select</code> clause, as shown below, can be used to create new records from existing ones while refining data. The <code>where</code> clause can be used to filter items from an array.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/ContentFilter.html",
    "tags": [
      "Content Filter",
      "Message Channel",
      "Message Endpoint"
    ],
    "category": "Message Transformation",
    "index": 38,
    "icon": "/images/patterns/content-filter.svg",
    "codeFiles": [
      {
        "name": "content-filter.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype DetailedReimbursementTemplate record {\n    string reimbursementTypeID;\n    string reimbursementTypeName;\n    float fixedAmount;\n};\n\ntype ReimbursementTemplate record {\n    string reimbursementTypeID;\n    float fixedAmount;\n};\n\ntype Reimbursement record {\n    string id;\n    record {\n        string reimbursementTypeID;\n        float fixedAmount;\n    }[] reimbursementTemplates;\n};\n\nfinal http:Client xero = check new (\"http://api.xero.com.balmock.io\");\n\nservice /payroll on new http:Listener(8080) {\n\n    resource function post employees/[string id]/paytemplate/reimbursements(DetailedReimbursementTemplate[] templates)\n            returns Reimbursement|error {\n        ReimbursementTemplate[] reimbursementRequests = from var {reimbursementTypeID, fixedAmount} in templates\n                                                        select {reimbursementTypeID, fixedAmount};\n        return xero->/payrollxro/employees/[id]/paytemplate/reimbursements.post(reimbursementRequests);\n    }\n}"
      }
    ]
  },
  {
    "slug": "claim-check",
    "name": "Claim Check",
    "description": "Claim Check will store messages in a persistent storage and send a claim to another application to access the origin stored message.",
    "helps": "<p>Ballerina supports the persistent storage of messages. Popular storage technologies such as SQL, AWS S3, and Redis are available as Ballerina packages.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/StoreInLibrary.html",
    "tags": [
      "Claim Check",
      "Content Enricher",
      "Content Filter"
    ],
    "category": "Message Transformation",
    "index": 39,
    "icon": "/images/patterns/claim-check.svg",
    "codeFiles": [
      {
        "name": "claim-check-consumer.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerina/io;\nimport ballerinax/kafka;\n\ntype ScanResult [string, string];\n\nfinal http:Client awsS3Client = check new (\"http://bucket.s3.amazonaws.com.balmock,io\");\nfinal http:Client firebaseClient = check new (\"http://api.mriresults.firebase.com.balmock.io\");\nfinal kafka:Consumer kafkaConsumer = check new (kafka:DEFAULT_URL, {\n    groupId: \"mri-scan-group\",\n    topics: [\"topic-mri-scan\"]\n});\n\npublic function main() returns error? {\n    while true {\n        ScanResult[] mriScanResults = check kafkaConsumer->pollPayload(1);\n        foreach var [scanId, patientId] in mriScanResults {\n            http:Response s3Response = check awsS3Client->/mri\\-scans/[scanId].get();\n            string mriScanResult = analyzeMriScan(check s3Response.getByteStream());\n            _ = check firebaseClient->/mri/[scanId]/reports\\.json.put({mriScanResult, patientId}, targetType = json);\n        }\n    }\n}\n\nisolated function analyzeMriScan(stream<byte[], io:Error?> fileByteStream) returns string {\n    // logic to analyze the MRI scan\n    return \"No Abnormalities Detected\";\n}"
      },
      {
        "name": "claim-check-producer.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerina/io;\nimport ballerina/mime;\nimport ballerina/uuid;\nimport ballerinax/kafka;\n\nfinal http:Client awsS3Client = check new (\"http://bucket.s3.amazonaws.com.balmock,io\");\nfinal kafka:Producer kafkaProducer = check new (kafka:DEFAULT_URL);\n\ntype ScanRequest record {|\n    string patientId;\n    stream<byte[], io:Error?> fileByteStream;\n|};\n\nservice /api/v1 on new http:Listener(8080) {\n\n    isolated resource function post scans/mri(http:Request request) returns error? {\n        ScanRequest {patientId, fileByteStream} = check scanRequestFromMultipart(request);\n\n        string claimCheckId = uuid:createType1AsString();\n        string fileName = string `${claimCheckId}.dicom`;\n\n        http:Request s3ObjectCreationRequest = new;\n        s3ObjectCreationRequest.setByteStream(fileByteStream);\n        _ = check awsS3Client->/mri\\-scans/[fileName].put(s3ObjectCreationRequest, targetType = http:Response);\n\n        _ = check kafkaProducer->send({\n            topic: \"topic-mri-scan\",\n            value: [fileName, patientId]\n        });\n    }\n}\n\nisolated function scanRequestFromMultipart(http:Request request) returns ScanRequest|error {\n    mime:Entity[] bodyParts = check request.getBodyParts();\n    string? patientId = ();\n    stream<byte[], io:Error?>? fileByteStream = ();\n    foreach mime:Entity bodyPart in bodyParts {\n        string partName = bodyPart.getContentDisposition().name;\n        if partName == \"patientId\" {\n            patientId = check bodyPart.getText();\n        } else if partName == \"file\" {\n            fileByteStream = check bodyPart.getByteStream();\n        }\n    }\n    if patientId == () || fileByteStream == () {\n        return error(\"Multipart request should contains both patientId and file parts\");\n    }\n    return {fileByteStream, patientId};\n}"
      }
    ]
  },
  {
    "slug": "normalizer",
    "name": "Normalizer",
    "description": "Normalizer routes each message type through a custom message translator so that the resulting messages match a common format.",
    "helps": "<p>Ballerina's type test (<code>is</code> keyword) and match statement can both be used to test the structure of incoming data. Then the data can be transformed into the required format to construct new data structures. Ballerina's data-oriented design helps with complex transformations with features such as destructuring, query expressions, spread operator, etc.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Normalizer.html",
    "tags": [
      "Normalizer",
      "Message Channel",
      "Message Endpoint",
      "Message Translator",
      "Message Router",
      "Message"
    ],
    "category": "Message Transformation",
    "index": 40,
    "icon": "/images/patterns/normalizer.svg",
    "codeFiles": [
      {
        "name": "normalizer.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype ZendeskResponse record {\n    record {|\n        string url;\n        int id;\n        string subject;\n    |} ticket;\n};\n\nfinal http:Client zendeskClient = check new (\"http://api.zendesk.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function post ticket(@http:Payload json|xml request) returns string|error {\n        json normalizedRequest;\n        if request is json {\n            normalizedRequest = normalize(check request.subject, check request.comment);\n        } else {\n            normalizedRequest = normalize((request/<subject>).data(), (request/<comment>).data());\n        }\n        ZendeskResponse zendeskResponse = check zendeskClient->/api/v2/tickets.post(normalizedRequest);\n        return zendeskResponse.ticket.url;\n    }\n}\n\nfunction normalize(string subject, string comment) returns json {\n    return {\n        ticket: {\n            subject,\n            comment: {\n                body: comment\n            }\n        }\n    };\n}"
      }
    ]
  },
  {
    "slug": "canonical-data-model",
    "name": "Canonical Data Model",
    "description": "The Canonical Data Model is a common message format used by different applications for communication.",
    "helps": "<p>Ballerina provides powerful data modelling capabilities through its Type System. You can define data types like JSON and xml, and structures like records to represent your canonical data model. This ensures interoperability when integrating different components in your system, making it easier to exchange data seamlessly.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/CanonicalDataModel.html",
    "tags": [
      "Canonical Data Model",
      "Message Router",
      "Message Translator",
      "Format Indicator"
    ],
    "category": "Message Transformation",
    "index": 41,
    "icon": "/images/patterns/canonical-data-model.svg",
    "codeFiles": [
      {
        "name": "canonical-data-model.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\nconst PROJECT_ID = \"LAND-TEST04\";\nconst DATASET_ID = \"f57074a0-a8b6-403e-9df1-e9fc46\";\n\nfinal http:Client gMapClient = check new (\"http://mapsplatformdatasets.googleapis.com.balmock.io\");\nfinal http:Client microsoftClient = check new (\"http://atlas.microsoft.com.balmock.io\");\n\ntype Gpx xml;\n\ntype Kml xml;\n\ntype Csv record {|\n    float X;\n    float Y;\n    string Name;\n    string Description;\n|}[];\n\ntype GeoJson record {\n    string 'type = \"FeatureCollection\";\n    string name = \"PlaceMarks\";\n    Feature[] features;\n};\n\ntype Feature record {|\n    string 'type = \"Feature\";\n    record {|\n        string X;\n        string Y;\n        string Name;\n        string description;\n    |} properties;\n    record {|\n        string 'type = \"Point\";\n        string[] coordinates;\n    |} geometry;\n|};\n\ntype GMapResponse record {\n    string name;\n    string displayName;\n    string createTime;\n};\n\ntype MicrosoftMapResponse record {\n    string formatVersion;\n    record {\n        record {\n            string latitude;\n            string longitude;\n        }[] points;\n    }[] routes;\n};\n\nservice /map on new http:Listener(8080) {\n    resource function post uploadPlaceMarks(http:Request request) returns GMapResponse|error? {\n        Csv|Gpx data = check getPayload(request);\n        GeoJson geoJson = convertToCanonical(data);\n        Kml kmlData = convertFromCanonicalToKml(geoJson);\n        GMapResponse gMapResponse = check gMapClient->post(\n            string `/v1/projects/${PROJECT_ID}/datasets/${DATASET_ID}:import`, kmlData);\n        return gMapResponse;\n    }\n\n    resource function post getRouteDirection(http:Request request, string query) returns MicrosoftMapResponse|error {\n        Csv|Gpx data = check getPayload(request);\n        GeoJson geoJson = convertToCanonical(data);\n        MicrosoftMapResponse microsoftMapResponse = check microsoftClient->/route/directions/'json.post(\n            {\"supportingPoints\": geoJson.toJson()}, {query: string `${query}`}\n        );\n        return microsoftMapResponse;\n    }\n}\n\nisolated function convertToCanonical(Csv|Gpx data) returns GeoJson {\n    if data is Csv {\n        return convertFromCsvToCanonical(data);\n    } else {\n        return convertFromGpxToCanonical(data);\n    }\n}\n\nisolated function getPayload(http:Request request) returns Csv|Gpx|error {\n    if request.getContentType().includes(\"xml\") {\n        return request.getXmlPayload();\n    }\n    json data = check request.getJsonPayload();\n    return data.cloneWithType(Csv);\n}\n\nisolated function convertFromCsvToCanonical(Csv data) returns GeoJson {\n    return {\n        features: from var member in data\n                  let string X = member.X.toString(), string Y = member.Y.toString()\n                  select {\n                      properties: {X, Y, Name: member.Name, description: member.Description},\n                      geometry: {coordinates: [X, Y]}\n                  }\n    };\n}\n\nisolated function convertFromGpxToCanonical(Gpx gpxData) returns GeoJson {\n    return {\n        features: from var extension in gpxData/**/<extensions>\n            select {\n                properties: {\n                    X: (extension/**/<X>).data(),\n                    Y: (extension/**/<X>).data(),\n                    Name: (extension/**/<Name>).data(),\n                    description: (extension/**/<description>).data()\n                },\n                geometry: {coordinates: [(extension/**/<X>).data(), (extension/**/<Y>).data()]}\n            }\n    };\n}\n\nisolated function convertFromCanonicalToKml(GeoJson geoJson) returns Kml {\n    xml kmlData = xml `<kml>\n        <Document>\n            <Schema id=\"temp\">\n                <SimpleField name=\"X\" type=\"double\"/>\n                <SimpleField name=\"Y\" type=\"double\"/>\n                <SimpleField name=\"Name\" type=\"string\"/>\n            </Schema>\n            ${from Feature feature in geoJson.features\n              select xml `<Placemark>\n                            <description>${feature.properties.description}</description>\n                            <Point>\n                                <coordinates>\n                                    ${feature.geometry.coordinates[0]},${feature.geometry.coordinates[1]}\n                                </coordinates>\n                            </Point>\n                          </Placemark>`}\n            </Document>\n        </kml>`;\n    return kmlData;\n}"
      }
    ]
  },
  {
    "slug": "point-to-point-channel",
    "name": "Point-to-Point Channel",
    "description": "Point-to-Point Channel ensures that only one receiver consumes any given message.",
    "helps": "<p>Ballerina supports a rich set of libraries to support various messaging protocols. These protocols support point-to-point messaging semantics. E.g.: HTTP, gRPC, GraphQL.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/PointToPointChannel.html",
    "tags": [
      "Point-to-Point Channel",
      "Message Channel",
      "Command Message"
    ],
    "category": "Messaging Channels",
    "index": 6,
    "icon": "/images/patterns/point-to-point-channel.svg",
    "codeFiles": [
      {
        "name": "point-to-point-channel.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype ProductCreationResponse record {|\n    boolean success;\n    string id;\n|};\n\nfinal http:Client zuora = check new (\"http://rest.zuora.com.balmock.io\");\n\npublic function main() returns error? {\n    var product = {\n        \"Description\": \"Cell phone service for call center operators\",\n        \"EffectiveEndDate\": \"2025-10-01\",\n        \"EffectiveStartDate\": \"2023-10-01\",\n        \"Name\": \"Cell Phone Service\",\n        \"SKU\": \"API-SKU09723199712\"\n    };\n    _ = check zuora->/v1/'object/product.post(product, targetType = ProductCreationResponse);\n}"
      }
    ]
  },
  {
    "slug": "publish-subscribe-channel",
    "name": "Publish-Subscribe Channel",
    "description": "Publish-Subscribe Channel delivers a copy of a particular event to each receiver.",
    "helps": "<p>Ballerina has a rich set of packages to interact with various messaging protocols. These include protocols that support publish-subscribe semantics such as Kafka, MQTT, and WebSocket.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/PublishSubscribeChannel.html",
    "tags": [
      "Publish-Subscribe Channel",
      "Message Channel",
      "Message Endpoint",
      "Message Router"
    ],
    "category": "Messaging Channels",
    "index": 7,
    "icon": "/images/patterns/publish-subscribe-channel.svg",
    "codeFiles": [
      {
        "name": "publisher.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerinax/kafka;\n\ntype MatchEvent record {|\n    string matchId;\n    string time;\n    string event;\n    string description;\n|};\n\nservice /api on new http:Listener(8080) {\n\n    private final kafka:Producer kafkaPublisher;\n\n    function init() returns error? {\n        self.kafkaPublisher = check new (kafka:DEFAULT_URL);\n    }\n\n    resource function post cricket/matches/[string matchId]/event(MatchEvent event) returns error? {\n        check self.kafkaPublisher->send({\n            topic: matchId,\n            value: event\n        });\n    }\n}"
      },
      {
        "name": "subscriber.bal",
        "language": "ballerina",
        "content": "import ballerina/uuid;\nimport ballerina/websocket;\nimport ballerinax/kafka;\n\nservice /ws on new websocket:Listener(8081) {\n\n    resource function get [string matchId]() returns websocket:Service|error {\n        return new MatchUpdateService(matchId);\n    }\n}\n\nisolated service class MatchUpdateService {\n    *websocket:Service;\n    private final kafka:Consumer kafkaConsumer;\n\n    public function init(string matchId) returns error? {\n        self.kafkaConsumer = check new (kafka:DEFAULT_URL, {\n            groupId: string `realtime-web-ui-group-${uuid:createType1AsString()}`,\n            topics: [matchId]\n        });\n    }\n\n    isolated remote function onOpen(websocket:Caller caller) returns error? {\n        while true {\n            anydata[] matchDetails = check self.kafkaConsumer->pollPayload(1);\n            from var matchDetail in matchDetails\n            do {\n                check caller->writeMessage(matchDetail);\n            };\n        }\n    }\n}"
      }
    ]
  },
  {
    "slug": "channel-adapter",
    "name": "Channel Adapter",
    "description": "The channel adapter is an interface to interact with a channel.",
    "helps": "<p>Ballerina supports a rich set of Connectors to interact with different applications. Developers can create their connectors and publish them as a package.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/ChannelAdapter.html",
    "tags": [
      "Channel Adapter",
      "Message Channel",
      "Messaging"
    ],
    "category": "Messaging Channels",
    "index": 12,
    "icon": "/images/patterns/channel-adapter.svg",
    "codeFiles": [
      {
        "name": "channel-adapter.bal",
        "language": "ballerina",
        "content": "import ballerina/io;\nimport ballerinax/jira;\n\nconfigurable string username = \"admin\";\nconfigurable string password = \"admin\";\n\nfinal jira:ConnectionConfig jiraConfig = {\n    auth: {\n        username,\n        password\n    }\n};\n\nfinal jira:Client jiraAdapter = check new (jiraConfig, \"http://wso2.jira.com.balmock.io\");\n\npublic function main() returns error? {\n    jira:Project result = check jiraAdapter->getProject(\"EI-Patterns-With-Ballerina\");\n    io:println(result.toString());\n}"
      }
    ]
  },
  {
    "slug": "messaging-bridge",
    "name": "Messaging Bridge",
    "description": "Massaging bridge connects multiple messaging systems by mapping channels and transforming message formats.",
    "helps": "<p>Single Ballerina program can connect to multiple messaging systems. Each system may utilize different protocols and message formats. Protocols such as HTTP, GRPC, Kafka, JDBC, etc. are supported via Ballerina's rich set of stranded libraries. JSON and XML are supported at the type system level. Other formats such as CSV and EDI are supported via libraries.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingBridge.html",
    "tags": [
      "Messaging Bridge",
      "Message Channel",
      "Message Endpoint",
      "Channel Adapter",
      "Message"
    ],
    "category": "Messaging Channels",
    "index": 13,
    "icon": "/images/patterns/messaging-bridge.svg",
    "codeFiles": [
      {
        "name": "messaging-bridge.bal",
        "language": "ballerina",
        "content": "import ballerina/graphql;\nimport ballerina/http;\n\ntype ProjectRequest record {|\n    string projectName;\n    string description;\n    string customerName;\n|};\n\ntype Project record {|\n    *ProjectRequest;\n    string projectID;\n    Task[] tasks;\n|};\n\ntype Task record {|\n    string taskID;\n    string description;\n|};\n\nfinal http:Client zoho = check new (\"http://zohoapis.com.balmock.io\");\n\nservice /api/v1 on new graphql:Listener(8080) {\n\n    resource function get project(string organizationID, string projectID) returns Project|error {\n        return zoho->/books/v3/projects/[projectID].get(organization_id = organizationID);\n    }\n\n    remote function createProject(string organizationID, ProjectRequest projectRequest) returns Project|error {\n        return zoho->/books/v3/projects.post(projectRequest, organization_id = organizationID);\n    }\n}"
      }
    ]
  },
  {
    "slug": "messaging-gateway",
    "name": "Messaging Gateway",
    "description": "Messaging Gateway wraps messaging-specific method calls and exposes domain-specific methods to the application.",
    "helps": "<p>Ballerina's classes and modules help to create wrappers and expose domain-specific functions and methods.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingGateway.html",
    "tags": [
      "Messaging Gateway",
      "Message"
    ],
    "category": "Messaging Endpoints",
    "index": 42,
    "icon": "/images/patterns/messaging-gateway.svg",
    "codeFiles": [
      {
        "name": "messaging-gateway.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerina/io;\n\npublic type ActivateLine readonly & record {|\n    string customerId;\n    string phoneNumber;\n    \"NEW ACTIVATION\"|\"TRANSFER\" activationType;\n    string planCode;\n    string activationDate;\n|};\n\ntype ActivationResponse readonly & record {|\n    string phoneNumber;\n    \"REJECTED\"|\"APPROVED\" status;\n|};\n\ntype ActivationSuccess readonly & record {|\n    string phoneNumber;\n|};\n\ntype ActivationFailureError error;\n\npublic class LineConnectionManager {\n\n    private final http:Client lineClinet;\n\n    public function init() returns error? {\n        self.lineClinet = check new (\"http://api.telcox.com.balmock.io\");\n    }\n\n    public function activateLine(ActivateLine activateLine) returns ActivationSuccess|ActivationFailureError {\n        ActivationResponse|error activationResponse =\n            self.lineClinet->/plans/[activateLine.planCode]/activate.post(activateLine);\n        if activationResponse is error || activationResponse.status == \"REJECTED\" {\n            return error(\"Connection activation failure\", phoneNumber = activateLine.phoneNumber);\n        }\n        return {phoneNumber: activateLine.phoneNumber};\n    }\n}\n\npublic function main() returns error? {\n    ActivateLine activateLine = {\n        customerId: \"USER-USW-0012300912\",\n        phoneNumber: \"555-555-5555\",\n        activationType: \"NEW ACTIVATION\",\n        planCode: \"PLN123\",\n        activationDate: \"2023-09-19\"\n    };\n\n    LineConnectionManager lineConnectionManager = check new;\n    ActivationSuccess|ActivationFailureError activateLineResult = lineConnectionManager.activateLine(activateLine);\n    io:println(activateLineResult);\n}"
      }
    ]
  },
  {
    "slug": "messaging-mapper",
    "name": "Messaging Mapper",
    "description": "The Messaging Mapper maps infrastructure messages to domain objects.",
    "helps": "<p>Ballerina services facilitate the direct mapping of incoming and outgoing domain objects to JSON values. Ballerina's table data structure offers the ability to store domain objects in memory, closely resembling the functionality of SQL-based tables.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingMapper.html",
    "tags": [
      "Messaging Mapper",
      "Message Translator"
    ],
    "category": "Messaging Endpoints",
    "index": 43,
    "icon": "/images/patterns/messaging-mapper.svg",
    "codeFiles": [
      {
        "name": "messaging-mapper.bal",
        "language": "ballerina",
        "content": "import ballerina/graphql;\nimport ballerina/uuid;\n\npublic type Item record {|\n    string code;\n    int quantity;\n    decimal unitPrice;\n|};\n\npublic type PurchasingRequest record {|\n    string customerId;\n    string agentId;\n    Item[] items;\n|};\n\npublic type Invoice record {|\n    *PurchasingRequest;\n    readonly string invoiceId;\n    decimal total;\n|};\n\nfinal table<Invoice> key(invoiceId) invoices = table [];\n\nservice /api/v1 on new graphql:Listener(8080) {\n\n    resource function get invoice(string invoiceId) returns Invoice? {\n        return invoices[invoiceId];\n    }\n\n    remote function createInvoice(PurchasingRequest purchasingRequest) returns Invoice {\n        Invoice invoice = {\n            ...purchasingRequest,\n            invoiceId: uuid:createType1AsString(),\n            total: from var {unitPrice, quantity} in purchasingRequest.items\n                   let var itemTotalPrice = unitPrice * quantity\n                   collect sum(itemTotalPrice)\n        };\n        invoices.add(invoice);\n        return invoice;\n    }\n}"
      }
    ]
  },
  {
    "slug": "polling-consumer",
    "name": "Polling Consumer",
    "description": "Polling consumer consumes messages from a channel when the application is ready to process them.",
    "helps": "<p>Ballerina's concurrency model enables writing simple procedural code that is nevertheless executed in a non-blocking manner. In the below example, <code>sleep</code> does not block the underlying thread. Other Ballerina concurrency constructs, such as <code>wait</code>, behave similarly.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/PollingConsumer.html",
    "tags": [
      "Polling Consumer",
      "Durable Subscriber",
      "Message"
    ],
    "category": "Messaging Endpoints",
    "index": 45,
    "icon": "/images/patterns/polling-consumer.svg",
    "codeFiles": [
      {
        "name": "polling-consumer.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerina/lang.runtime;\n\nenum Status {\n    CREATED,\n    CAPTURED,\n    DENIED,\n    PENDING\n}\n\ntype PaypalResponse record {|\n    string id;\n    Status status;\n    Amount amount;\n    Payee payee;\n|};\n\ntype Amount record {|\n    string value;\n    string currency_code;\n|};\n\ntype Payee record {|\n    string email_address;\n    string merchant_id;\n|};\n\nfinal http:Client paypalClient = check new (\"http://api-m.paypal.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    resource function get payment(string paymentId) returns string|error {\n        foreach int _ in 0 ..< 10 {\n            PaypalResponse response = check paypalClient->/v2/payments/authorizations/[paymentId]();\n            if response.status == CREATED || response.status == PENDING {\n                runtime:sleep(5); // sleep does not block the underlying thread\n            } else {\n                return response.status;\n            }\n        }\n        return error(\"Payment timed out\");\n    }\n}"
      }
    ]
  },
  {
    "slug": "message-dispatcher",
    "name": "Message Dispatcher",
    "description": "Message dispatcher coordinates message processing among multiple performers.",
    "helps": "<p>Ballerina programs can maintain the state internally using variables and perform logic based on the state.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageDispatcher.html",
    "tags": [
      "Message Dispatcher",
      "Competing Consumers",
      "Transactional Client"
    ],
    "category": "Messaging Endpoints",
    "index": 48,
    "icon": "/images/patterns/message-dispatcher.svg",
    "codeFiles": [
      {
        "name": "message-dispatcher.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\nfinal http:Client ocrClient = check new (\"http://api.ocr.com.balmock.io\");\n\ntype OcrResponse record {|\n    string[] lines;\n    int noOfLines;\n    string pdfUrl;\n|};\n\nfinal readonly & string[] ocrProcessors = [\"processor1\", \"processor2\", \"processor3\"];\n\nservice / on new http:Listener(8080) {\n    int processorNo = 0;\n\n    isolated resource function get ocr(string url) returns OcrResponse|error {\n        int currentProcessor;\n        lock {\n            currentProcessor = self.processorNo;\n            self.processorNo = currentProcessor == 2 ? 0 : currentProcessor + 1;\n        }\n        string processorId = ocrProcessors[currentProcessor];\n        return check ocrClient->/[processorId]/parse/imageurl(url = url);\n    }\n}"
      }
    ]
  },
  {
    "slug": "selective-consumer",
    "name": "Selective Consumer",
    "description": "Selective consumer filters the messages which come from a message channel using a criteria.",
    "helps": "<p>Ballerina supports rich set of messaging protocols. Some of these protocols supports channels with filtering capabilities.  Below example uses GraphQL's filtering capabilities to select the data it receives.  If a protocol does not support filtering, user may write their own logic using Ballerina control flow constructs such as <code>if</code>-<code>else</code> and <code>match</code> statements.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageSelector.html",
    "tags": [
      "Selective Consumer",
      "Message Filter",
      "Content Based Router",
      "Message"
    ],
    "category": "Messaging Endpoints",
    "index": 49,
    "icon": "/images/patterns/selective-consumer.svg",
    "codeFiles": [
      {
        "name": "selective-consumer.bal",
        "language": "ballerina",
        "content": "import ballerina/graphql;\nimport ballerina/io;\n\ntype InventoryResponse record {|\n    record {|Inventory[] products;|} data;\n|};\n\ntype Inventory record {|\n    string name;\n    int productsCount;\n|};\n\ntype CsvRecord record {|\n    string name;\n    RequestType requestType;\n|};\n\nenum RequestType {\n    REQUIRED,\n    URGENT\n};\n\nfinal graphql:Client shopify = check new (\"http://blackwellsbooks.myshopify.com.balmock.io\");\n\npublic function main(string category) returns error? {\n    string csvFilePath = \"./resources/orderRequests.csv\";\n    string document = string `{ products(productType: \"${category}\") { name, productsCount } } `;\n    InventoryResponse inventories = check shopify->execute(document);\n    CsvRecord[] csvContent = [];\n    foreach var {name, productsCount} in inventories.data.products {\n        if productsCount < 10 {\n            csvContent.push({name: name, requestType: URGENT});\n        } else if productsCount < 25 {\n            csvContent.push({name: name, requestType: REQUIRED});\n        }\n    }\n    check io:fileWriteCsv(csvFilePath, csvContent);\n}"
      }
    ]
  },
  {
    "slug": "idempotent-receiver",
    "name": "Idempotent Receiver",
    "description": "An idempotent receiver is a receiver that can safely receive the same message multiple times.",
    "helps": "<p>When implementing idempotent endpoints, such as HTTP PUT, users may use Ballerina to create logic that leaves the state in the same state even if the same message is received multiple times. Explicit de-duping can be implemented using Ballerina's rich set of packages to interact with databases and key-value stores, such as SQL and Redis.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/IdempotentReceiver.html",
    "tags": [
      "Idempotent Receiver",
      "Message",
      "Message Channel"
    ],
    "category": "Messaging Endpoints",
    "index": 51,
    "icon": "/images/patterns/idempotent-receiver.svg",
    "codeFiles": [
      {
        "name": "idempotent-receiver.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype OrderDetail record {\n    string orderId;\n    OrderStatus status;\n};\n\nenum OrderStatus {\n    CREATED,\n    SHIPPED,\n    COMPLETED,\n    CANCELLED\n};\n\nfinal map<OrderStatus> orderStatuses = {};\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function put manage\\-orders/[string orderId](OrderDetail orderDetail) returns\n        http:STATUS_NO_CONTENT|http:STATUS_CREATED {\n        OrderStatus? orderStatus = orderStatuses[orderId];\n        if orderStatus == orderDetail.status {\n            return http:STATUS_NO_CONTENT;\n        } else {\n            orderStatuses[orderId] = orderDetail.status;\n            return http:STATUS_CREATED;\n        }\n    }\n}"
      }
    ]
  },
  {
    "slug": "service-activator",
    "name": "Service Activator",
    "description": "Service activator provides a service that can be invoked via both messaging and non-messaging techniques.",
    "helps": "<p>Ballerina can expose public functions/classes that can be invoked by other Ballerina programs. This allows sharing common logic between services and applications. Such Ballerina packages can be published using Ballerina Central.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingAdapter.html",
    "tags": [
      "Service Activator",
      "Request-Reply",
      "Command Message"
    ],
    "category": "Messaging Endpoints",
    "index": 52,
    "icon": "/images/patterns/service-activator.svg",
    "codeFiles": [
      {
        "name": "service-activator.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype Customer record {|\n    string customerId;\n    string customerName;\n    decimal totalEligibleClaimAmount;\n|};\n\ntype ClaimRequest record {|\n    string customerId;\n    string policyNumber;\n    decimal claimAmount;\n    string accidentType;\n    string claimLocation;\n    ClaimDate claimDate;\n|};\n\ntype ClaimDate record {|\n    string year;\n    string month;\n    string day;\n|};\n\ntype Claim record {|\n    *ClaimRequest;\n    \"APPROVED\"|\"REJECTED\"|\"PENDING\" status;\n|};\n\ntype ClaimHistory record {|\n    string customerId;\n    Claim[] claims;\n|};\n\nfinal http:Client claimHistory = check new (\"http://api.claimhistory.firebase.com.balmock.io\");\nfinal http:Client customerDetails = check new (\"http://api.customerdetails.firebase.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    isolated resource function post claim(ClaimRequest claimRequest) returns decimal|error {\n        ClaimHistory claimHostory = check claimHistory->/claims/[claimRequest.customerId]/claims\\.json();\n        Customer customer = check customerDetails->/customers/[claimRequest.customerId]/details\\.json();\n        return calculateClaimAmount(claimRequest, claimHostory, customer.totalEligibleClaimAmount);\n    }\n}\n\nisolated function calculateClaimAmount(ClaimRequest claimRequest, ClaimHistory claimHistory, decimal totalElegibleAmount) returns decimal {\n    decimal totalClaimedAmount = from var {claimAmount, claimDate, status} in claimHistory.claims\n        where claimDate.year == claimRequest.claimDate.year && status == \"APPROVED\"\n        collect sum(claimAmount);\n    decimal remainingAmount = totalElegibleAmount - totalClaimedAmount;\n    return decimal:max(remainingAmount, claimRequest.claimAmount * 0.2);\n}"
      }
    ]
  },
  {
    "slug": "message-channel",
    "name": "Message Channel",
    "description": "Message channel connects one application to another, where one application writes information to the channel and the other one reads.",
    "helps": "<p>Ballerina supports message systems via its rich set of libraries. These libraries have <code>Client</code>s and <code>Listener</code>s to write and read messages.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageChannel.html",
    "tags": [
      "Message Channel",
      "Point-to-Point Channel",
      "Message"
    ],
    "category": "Messaging Systems",
    "index": 0,
    "icon": "/images/patterns/message-channel.svg",
    "codeFiles": [
      {
        "name": "message-channel.bal",
        "language": "ballerina",
        "content": "import ballerina/websocket;\n\nfinal map<websocket:Caller> connectionMap = {};\n\nservice /chat on new websocket:Listener(8080) {\n    resource function get .() returns websocket:Service {\n        return new ChatService();\n    }\n}\n\nservice class ChatService {\n    *websocket:Service;\n\n    remote function onOpen(websocket:Caller caller) returns error? {\n        string newUserConnectionId = caller.getConnectionId();\n        connectionMap[newUserConnectionId] = caller;\n        string message = string `New user joined with connection id: ${newUserConnectionId}`;\n        check broadcaseMessage(message, newUserConnectionId);\n    }\n\n    remote function onMessage(websocket:Caller caller, string chatMessage) returns error? {\n        check broadcaseMessage(chatMessage, caller.getConnectionId());\n    }\n\n    remote function onClose(websocket:Caller caller) returns error? {\n        _ = connectionMap.remove(caller.getConnectionId());\n    }\n}\n\nfunction broadcaseMessage(string message, string senderConnectionId) returns error? {\n    foreach var [connectionId, wsChannel] in connectionMap.entries() {\n        if connectionId != senderConnectionId {\n            check wsChannel->writeMessage(message);\n        }\n    }\n}"
      }
    ]
  },
  {
    "slug": "message",
    "name": "Message",
    "description": "Message is a data record that the messaging system can transmit through a message channel.",
    "helps": "<p>Ballerina is a data-oriented language. It has first-class support for data to be repressed as arrays, maps, records, and tuples. These values can be read and written to message channels.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Message.html",
    "tags": [
      "Message",
      "Command Message",
      "Document Message",
      "Message Channel"
    ],
    "category": "Messaging Systems",
    "index": 1,
    "icon": "/images/patterns/message.svg",
    "codeFiles": [
      {
        "name": "message.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype SurveyUpdateRequest record {\n    string title;\n    string from_template_id;\n    boolean footer;\n    string folder_id;\n    int theme_id;\n};\n\nfinal http:Client surveyMonkey = check new (\"http://api.surveymonkey.com/v3/surveys\");\n\npublic function main() returns error? {\n    SurveyUpdateRequest message = {\n        title: \"Customer Satisfaction Survey 2023\",\n        from_template_id: \"customer_satisfaction_template_7\",\n        footer: true,\n        folder_id: \"customer_satisfaction\",\n        theme_id: 789\n    };\n    _ = check surveyMonkey->/v3/surveys/[\"1267\"].put(message, targetType = http:Response);\n}"
      }
    ]
  },
  {
    "slug": "pipes-and-filters",
    "name": "Pipes And Filters",
    "description": "The pipes and Filters pattern divides a larger processing task into a sequence of smaller, independent processing steps (Filters) that are connected by channels (Pipes).",
    "helps": "<p>Ballerina has a query expression syntax that acts as a pipeline of data. Within a query expression, the <code>where</code> clause can be used to filter data. Existing functions can be called within the query expression to compose complex message processing logic.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/PipesAndFilters.html",
    "tags": [
      "Pipes and Filters",
      "Message Filter",
      "Message Channel",
      "Message"
    ],
    "category": "Messaging Systems",
    "index": 2,
    "icon": "/images/patterns/pipes-and-filters.svg",
    "codeFiles": [
      {
        "name": "pipes-and-filters.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype EmployeePerformance record {|\n    string empId;\n    int productivity;\n    int customerSatisfaction;\n    int goalAchievement;\n|};\n\ntype TopPerformer record {|\n    string empId;\n    float performance;\n|};\n\nfinal http:Client firebaseClient = check new (\"http://api.employee.performance.firebase.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    isolated resource function get employee/top\\-performers(int count) returns TopPerformer[]|error {\n        EmployeePerformance[] employeePerformace = check firebaseClient->/performance\\.json();\n        return from var {empId, productivity, customerSatisfaction, goalAchievement} in employeePerformace\n               let float performance = productivity * 0.3 + customerSatisfaction * 0.1 + goalAchievement * 0.6\n               where performance > 7.5\n               limit count\n               order by performance descending\n               select {empId, performance};\n    }\n}"
      }
    ]
  },
  {
    "slug": "message-router",
    "name": "Message Router",
    "description": "Message router consumes a message from one channel and republishes it to a different channel depending on a set of conditions.",
    "helps": "<p>Ballerina supports conditional logic with if-else and match statements.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageRouter.html",
    "tags": [
      "Message Router",
      "Message Channel",
      "Message Endpoint",
      "Message"
    ],
    "category": "Messaging Systems",
    "index": 3,
    "icon": "/images/patterns/message-router.svg",
    "codeFiles": [
      {
        "name": "message-router.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype DhlUkResponse record {|\n    string url;\n    record {|\n        string id;\n        Status status;\n    |}[] shipments;\n|};\n\ntype DhlDpiResponse record {|\n    Status[] events;\n    string publicUrl;\n    string barcode;\n|};\n\ntype Status record {|\n    string statusCode;\n    string status;\n|};\n\nenum Country {\n    UK,\n    DE\n}\n\nfinal http:Client dhl = check new (\"http://api.dhl.com.balmock.io\");\n\nservice /shipments on new http:Listener(8080) {\n\n    resource function get [Country country]/[string trackingNumber]/status() returns string|error {\n        match country {\n            UK => {\n                DhlUkResponse response = check dhl->/parceluk/tracking/v1/shipments(trackingNumber = trackingNumber);\n                return response.shipments[0].status.status;\n            }\n            DE => {\n                DhlDpiResponse response = check dhl->/dpi/tracking/v1/trackings/[trackingNumber];\n                return response.events[0].status;\n            }\n            _ => {\n                return error(\"County not supported\");\n            }\n        }\n    }\n}"
      }
    ]
  },
  {
    "slug": "message-translator",
    "name": "Message Translator",
    "description": "The Message Translator transforms messages from one structure to another.",
    "helps": "<p>Ballerina comes with a data mapper as part of its Visual Studio Code extension, allowing you to effortlessly map data from one record to another.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageTranslator.html",
    "tags": [
      "Message Translator",
      "Message Endpoint"
    ],
    "category": "Messaging Systems",
    "index": 4,
    "icon": "/images/patterns/message-translator.svg",
    "codeFiles": [
      {
        "name": "message-translator.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\npublic type SalesData record {|\n    Customer customer;\n    Oppotunity[] opportunities;\n|};\n\npublic type Customer record {|\n    string id;\n    string name;\n    string email;\n|};\n\npublic type Oppotunity record {|\n    string id;\n    decimal amount;\n    string closeDate;\n|};\n\npublic type QuickBooksInvoice record {|\n    string customerId;\n    Invoice[] invoices;\n|};\n\npublic type Invoice record {|\n    string id;\n    decimal amount;\n    string invoiceDate;\n|};\n\nfinal http:Client quickBooks = check new (\"http://api.quickbooks.com.balmock.io\");\n\nservice /api/v1/analytics on new http:Listener(8080) {\n\n    resource function post sales(SalesData salesData) returns error? {\n        QuickBooksInvoice quickBooksInvoice = translate(salesData);\n        _ = check quickBooks->/v3/company/REALM012/invoice.post(quickBooksInvoice, targetType = http:Response);\n    }\n}\n\nfunction translate(SalesData salesData) returns QuickBooksInvoice {\n    return {\n        customerId: salesData.customer.id,\n        invoices: from var oppotunity in salesData.opportunities\n                  select {\n                      id: oppotunity.id,\n                      amount: oppotunity.amount,\n                      invoiceDate: oppotunity.closeDate\n                  }\n    };\n}"
      }
    ]
  },
  {
    "slug": "message-endpoint",
    "name": "Message Endpoint",
    "description": "Message Endpoint is a client of the messaging channel. It abstracts the details of communication to the application.",
    "helps": "<p>Ballerina supports a rich set of libraries that abstract various messaging protocols (such as HTTP, gRPC, and Kafka) and provides a <code>Client</code> interface that acts as a message endpoint.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageEndpoint.html",
    "tags": [
      "Message Endpoint",
      "Message Channel"
    ],
    "category": "Messaging Systems",
    "index": 5,
    "icon": "/images/patterns/message-endpoint.svg",
    "codeFiles": [
      {
        "name": "message-endpoint.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype Currency \"AUD\"|\"INR\"|\"BGP\";\n\nfinal readonly & map<decimal> rates = {\n    \"AUD\": 1.59,\n    \"INR\": 83.24,\n    \"GBP\": 0.83\n};\n\nservice /api/v1/rates on new http:Listener(8080) {\n    isolated resource function get covert(Currency base, Currency target, decimal amount = 1.00) returns decimal {\n        decimal baseUsdValue = rates.get(base);\n        decimal targetUsdValue = rates.get(target);\n        return (targetUsdValue / baseUsdValue) * amount;\n    }\n}"
      }
    ]
  },
  {
    "slug": "wire-tap",
    "name": "Wire Tap",
    "description": "Wire tap publishes each incoming message unmodified to a secondary channel for inspection and analysis.",
    "helps": "<p>Ballerina has a lightweight concurrency model with built-in syntax support. This helps to send messages to a secondary channel parallelly without blocking the main channel.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/WireTap.html",
    "tags": [
      "Wire Tap",
      "Message Channel",
      "Message Endpoint"
    ],
    "category": "System Management",
    "index": 55,
    "icon": "/images/patterns/wire-tap.svg",
    "codeFiles": [
      {
        "name": "wire-tap.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype SnowflakeRequest record {\n    string statement;\n    string timeout = \"60\";\n    string database = \"messageLog\";\n    string schema = \"message\";\n    string role = \"logger\";\n};\n\ntype StockResponse record {\n    string ParentHandlingUnitUUID;\n    string StockItemUUID;\n    string EWMWarehouse;\n    string HandlingUnitNumber;\n    string ShelfLifeExpirationDate;\n    string CountryOfOrigin;\n};\n\ntype LogLevel \"INFO\"|\"WARNING\"|\"ERROR\";\n\nfinal http:Client sapClient = check new (\"http://api.sap.com.balmock.io\");\nfinal http:Client db = check new (\"http://api.snowflake.com.balmock.io\");\n\nservice /warehouse on new http:Listener(8080) {\n\n    resource function get stock(string parentId, string productId) returns StockResponse|error {\n        StockResponse result = check sapClient->/WarehousePhysicalStockProducts/[parentId]/[productId];\n        worker w returns error? {\n            check wiretap(\"stock\", \"INFO\", result.toString());\n        }\n        return result;\n    }\n}\n\nfunction wiretap(string tableName, LogLevel severity, string message) returns error? {\n    SnowflakeRequest snowflakeRequest = {statement: string `insert into ${tableName} values (${message}, ${severity}))`};\n    json _ = check db->/statements.post(snowflakeRequest);\n}"
      }
    ]
  },
  {
    "slug": "message-history",
    "name": "Message History",
    "description": "Message History maintains a list of all components that the message passed through. Every component that processes the message adds one entry to the list.",
    "helps": "<p>Depending on the protocol, Ballerina provides APIs to manipulate message content, including headers.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageHistory.html",
    "tags": [
      "Message History",
      "Message Store",
      "Message Router"
    ],
    "category": "System Management",
    "index": 56,
    "icon": "/images/patterns/message-history.svg",
    "codeFiles": [
      {
        "name": "message-history.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype ReimbursementRequest record {|\n    string employee_id;\n    string reason;\n    string amount;\n|};\n\ntype TraceId record {|\n    string id;\n|};\n\nfinal http:Client internalClient = check new (\"http://api.internal.balmock.io\");\nfinal http:Client logClient = check new (\"http://api.internal-log.balmock.io\");\nconst HISTORY_HEADER = \"x-message-history\";\n\nservice /finance on new http:Listener(8080) {\n    resource function post reimburse(ReimbursementRequest request) returns http:Response|error {\n        http:Response response = check internalClient->post(\"/reimbursements\", request);\n        http:Response outbound = new;\n        outbound.setPayload(check response.getJsonPayload());\n        outbound.statusCode = response.statusCode;\n\n        string traceId = check logAndGetTraceId(request);\n        if response.hasHeader(HISTORY_HEADER) {\n            string existingHeader = check response.getHeader(HISTORY_HEADER);\n            outbound.setHeader(HISTORY_HEADER, existingHeader + \";\" + traceId);\n        } else {\n            outbound.setHeader(HISTORY_HEADER, traceId);\n        }\n        return outbound;\n    }\n}\n\nfunction logAndGetTraceId(anydata message) returns string|error {\n    TraceId traceId = check logClient->post(\"/log_message\", message);\n    return traceId.id;\n}"
      }
    ]
  },
  {
    "slug": "message-store",
    "name": "Message Store",
    "description": "Message store captures information about each message in a central location.",
    "helps": "<p>Ballerina can send messages to multiple channels during a single service invocation. Ballerina's concurrency model helps to send messages asynchronously without blocking the main channel. The wildcard binding pattern is used to indicate a 'fire-and-forget' invocation, where the response is not used.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageStore.html",
    "tags": [
      "Message Store",
      "Message Channel",
      "Wire Tap",
      "Message Endpoint",
      "Message"
    ],
    "category": "System Management",
    "index": 57,
    "icon": "/images/patterns/message-store.svg",
    "codeFiles": [
      {
        "name": "message-store.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype GeoCodeResponse record {|\n    json results;\n|};\n\nfinal http:Client geoCodingClient = check new (\"http://api.maps.googleapis.com.balmock.io\");\nfinal http:Client firebaseClient = check new (\"http://api.mapsproject.firebase.com.balmock.io\");\n\nservice /api on new http:Listener(8080) {\n\n    resource function get location(string address) returns GeoCodeResponse|error {\n        GeoCodeResponse|error storedGeocode = firebaseClient->/location/[address]/location\\.json();\n        if storedGeocode !is error {\n            return storedGeocode;\n        }\n        GeoCodeResponse geocode = check geoCodingClient->/maps/api/geocode/'json(place = address);\n        var _ = start storeAddress(address, geocode);\n        return geocode;\n    }\n}\n\nfunction storeAddress(string address, GeoCodeResponse geocode) returns error? {\n    _ = check firebaseClient->/location/[address]/location\\.json.put(geocode, targetType = json);\n}"
      }
    ]
  },
  {
    "slug": "test-message",
    "name": "Test Message",
    "description": "Assure the health of messaging components by sending test messages. Note: Instead of the original pattern, we have selected a modern version where infrastructure polls for the health of the components.",
    "helps": "<p>Ballerina provides built-in support for creating, propagating(<code>check</code> keyword), and handling errors. Error handling logic can be performed after testing if a given value is an error using the <code>is</code> keyword.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/TestMessage.html",
    "tags": [
      "Test Message",
      "Message Filter",
      "Message"
    ],
    "category": "System Management",
    "index": 59,
    "icon": "/images/patterns/test-message.svg",
    "codeFiles": [
      {
        "name": "test-message.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerina/sql;\nimport ballerinax/mysql;\nimport ballerinax/mysql.driver as _;\n\nservice /customer on new http:Listener(8080) {\n    private mysql:Client? db = null;\n    boolean dbConnected = false;\n\n    function init() {\n        mysql:Client|error dbClient = new (\"localhost\", \"admin\", \"adminpass\", \"CUSTOMER\", 3000);\n        if dbClient is mysql:Client {\n            self.db = dbClient;\n            self.dbConnected = true;\n        }\n    }\n\n    resource function get phoneNumber(string id) returns string|http:InternalServerError|http:NotFound|error {\n        mysql:Client? db = self.db;\n        if db !is mysql:Client {\n            return http:INTERNAL_SERVER_ERROR;\n        }\n\n        string|error result = db->queryRow(`SELECT number FROM customers WHERE id = ${id}`);\n        if result is sql:NoRowsError {\n            return http:NOT_FOUND;\n        }\n        return result;\n    }\n\n    resource function get heartbeat() returns http:Ok|http:InternalServerError {\n        return self.dbConnected ? http:OK : http:INTERNAL_SERVER_ERROR;\n    }\n}"
      }
    ]
  }
] as const;

export const enterpriseIntegrationPatternCategories: EnterpriseIntegrationPatternCategory[] = [
  {
    "category": "Messaging Systems",
    "items": [
      {
        "slug": "message-channel",
        "name": "Message Channel",
        "description": "Message channel connects one application to another, where one application writes information to the channel and the other one reads.",
        "helps": "<p>Ballerina supports message systems via its rich set of libraries. These libraries have <code>Client</code>s and <code>Listener</code>s to write and read messages.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageChannel.html",
        "tags": [
          "Message Channel",
          "Point-to-Point Channel",
          "Message"
        ],
        "category": "Messaging Systems",
        "index": 0,
        "icon": "/images/patterns/message-channel.svg",
        "codeFiles": [
          {
            "name": "message-channel.bal",
            "language": "ballerina",
            "content": "import ballerina/websocket;\n\nfinal map<websocket:Caller> connectionMap = {};\n\nservice /chat on new websocket:Listener(8080) {\n    resource function get .() returns websocket:Service {\n        return new ChatService();\n    }\n}\n\nservice class ChatService {\n    *websocket:Service;\n\n    remote function onOpen(websocket:Caller caller) returns error? {\n        string newUserConnectionId = caller.getConnectionId();\n        connectionMap[newUserConnectionId] = caller;\n        string message = string `New user joined with connection id: ${newUserConnectionId}`;\n        check broadcaseMessage(message, newUserConnectionId);\n    }\n\n    remote function onMessage(websocket:Caller caller, string chatMessage) returns error? {\n        check broadcaseMessage(chatMessage, caller.getConnectionId());\n    }\n\n    remote function onClose(websocket:Caller caller) returns error? {\n        _ = connectionMap.remove(caller.getConnectionId());\n    }\n}\n\nfunction broadcaseMessage(string message, string senderConnectionId) returns error? {\n    foreach var [connectionId, wsChannel] in connectionMap.entries() {\n        if connectionId != senderConnectionId {\n            check wsChannel->writeMessage(message);\n        }\n    }\n}"
          }
        ]
      },
      {
        "slug": "message",
        "name": "Message",
        "description": "Message is a data record that the messaging system can transmit through a message channel.",
        "helps": "<p>Ballerina is a data-oriented language. It has first-class support for data to be repressed as arrays, maps, records, and tuples. These values can be read and written to message channels.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Message.html",
        "tags": [
          "Message",
          "Command Message",
          "Document Message",
          "Message Channel"
        ],
        "category": "Messaging Systems",
        "index": 1,
        "icon": "/images/patterns/message.svg",
        "codeFiles": [
          {
            "name": "message.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype SurveyUpdateRequest record {\n    string title;\n    string from_template_id;\n    boolean footer;\n    string folder_id;\n    int theme_id;\n};\n\nfinal http:Client surveyMonkey = check new (\"http://api.surveymonkey.com/v3/surveys\");\n\npublic function main() returns error? {\n    SurveyUpdateRequest message = {\n        title: \"Customer Satisfaction Survey 2023\",\n        from_template_id: \"customer_satisfaction_template_7\",\n        footer: true,\n        folder_id: \"customer_satisfaction\",\n        theme_id: 789\n    };\n    _ = check surveyMonkey->/v3/surveys/[\"1267\"].put(message, targetType = http:Response);\n}"
          }
        ]
      },
      {
        "slug": "pipes-and-filters",
        "name": "Pipes And Filters",
        "description": "The pipes and Filters pattern divides a larger processing task into a sequence of smaller, independent processing steps (Filters) that are connected by channels (Pipes).",
        "helps": "<p>Ballerina has a query expression syntax that acts as a pipeline of data. Within a query expression, the <code>where</code> clause can be used to filter data. Existing functions can be called within the query expression to compose complex message processing logic.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/PipesAndFilters.html",
        "tags": [
          "Pipes and Filters",
          "Message Filter",
          "Message Channel",
          "Message"
        ],
        "category": "Messaging Systems",
        "index": 2,
        "icon": "/images/patterns/pipes-and-filters.svg",
        "codeFiles": [
          {
            "name": "pipes-and-filters.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype EmployeePerformance record {|\n    string empId;\n    int productivity;\n    int customerSatisfaction;\n    int goalAchievement;\n|};\n\ntype TopPerformer record {|\n    string empId;\n    float performance;\n|};\n\nfinal http:Client firebaseClient = check new (\"http://api.employee.performance.firebase.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    isolated resource function get employee/top\\-performers(int count) returns TopPerformer[]|error {\n        EmployeePerformance[] employeePerformace = check firebaseClient->/performance\\.json();\n        return from var {empId, productivity, customerSatisfaction, goalAchievement} in employeePerformace\n               let float performance = productivity * 0.3 + customerSatisfaction * 0.1 + goalAchievement * 0.6\n               where performance > 7.5\n               limit count\n               order by performance descending\n               select {empId, performance};\n    }\n}"
          }
        ]
      },
      {
        "slug": "message-router",
        "name": "Message Router",
        "description": "Message router consumes a message from one channel and republishes it to a different channel depending on a set of conditions.",
        "helps": "<p>Ballerina supports conditional logic with if-else and match statements.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageRouter.html",
        "tags": [
          "Message Router",
          "Message Channel",
          "Message Endpoint",
          "Message"
        ],
        "category": "Messaging Systems",
        "index": 3,
        "icon": "/images/patterns/message-router.svg",
        "codeFiles": [
          {
            "name": "message-router.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype DhlUkResponse record {|\n    string url;\n    record {|\n        string id;\n        Status status;\n    |}[] shipments;\n|};\n\ntype DhlDpiResponse record {|\n    Status[] events;\n    string publicUrl;\n    string barcode;\n|};\n\ntype Status record {|\n    string statusCode;\n    string status;\n|};\n\nenum Country {\n    UK,\n    DE\n}\n\nfinal http:Client dhl = check new (\"http://api.dhl.com.balmock.io\");\n\nservice /shipments on new http:Listener(8080) {\n\n    resource function get [Country country]/[string trackingNumber]/status() returns string|error {\n        match country {\n            UK => {\n                DhlUkResponse response = check dhl->/parceluk/tracking/v1/shipments(trackingNumber = trackingNumber);\n                return response.shipments[0].status.status;\n            }\n            DE => {\n                DhlDpiResponse response = check dhl->/dpi/tracking/v1/trackings/[trackingNumber];\n                return response.events[0].status;\n            }\n            _ => {\n                return error(\"County not supported\");\n            }\n        }\n    }\n}"
          }
        ]
      },
      {
        "slug": "message-translator",
        "name": "Message Translator",
        "description": "The Message Translator transforms messages from one structure to another.",
        "helps": "<p>Ballerina comes with a data mapper as part of its Visual Studio Code extension, allowing you to effortlessly map data from one record to another.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageTranslator.html",
        "tags": [
          "Message Translator",
          "Message Endpoint"
        ],
        "category": "Messaging Systems",
        "index": 4,
        "icon": "/images/patterns/message-translator.svg",
        "codeFiles": [
          {
            "name": "message-translator.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\npublic type SalesData record {|\n    Customer customer;\n    Oppotunity[] opportunities;\n|};\n\npublic type Customer record {|\n    string id;\n    string name;\n    string email;\n|};\n\npublic type Oppotunity record {|\n    string id;\n    decimal amount;\n    string closeDate;\n|};\n\npublic type QuickBooksInvoice record {|\n    string customerId;\n    Invoice[] invoices;\n|};\n\npublic type Invoice record {|\n    string id;\n    decimal amount;\n    string invoiceDate;\n|};\n\nfinal http:Client quickBooks = check new (\"http://api.quickbooks.com.balmock.io\");\n\nservice /api/v1/analytics on new http:Listener(8080) {\n\n    resource function post sales(SalesData salesData) returns error? {\n        QuickBooksInvoice quickBooksInvoice = translate(salesData);\n        _ = check quickBooks->/v3/company/REALM012/invoice.post(quickBooksInvoice, targetType = http:Response);\n    }\n}\n\nfunction translate(SalesData salesData) returns QuickBooksInvoice {\n    return {\n        customerId: salesData.customer.id,\n        invoices: from var oppotunity in salesData.opportunities\n                  select {\n                      id: oppotunity.id,\n                      amount: oppotunity.amount,\n                      invoiceDate: oppotunity.closeDate\n                  }\n    };\n}"
          }
        ]
      },
      {
        "slug": "message-endpoint",
        "name": "Message Endpoint",
        "description": "Message Endpoint is a client of the messaging channel. It abstracts the details of communication to the application.",
        "helps": "<p>Ballerina supports a rich set of libraries that abstract various messaging protocols (such as HTTP, gRPC, and Kafka) and provides a <code>Client</code> interface that acts as a message endpoint.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageEndpoint.html",
        "tags": [
          "Message Endpoint",
          "Message Channel"
        ],
        "category": "Messaging Systems",
        "index": 5,
        "icon": "/images/patterns/message-endpoint.svg",
        "codeFiles": [
          {
            "name": "message-endpoint.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype Currency \"AUD\"|\"INR\"|\"BGP\";\n\nfinal readonly & map<decimal> rates = {\n    \"AUD\": 1.59,\n    \"INR\": 83.24,\n    \"GBP\": 0.83\n};\n\nservice /api/v1/rates on new http:Listener(8080) {\n    isolated resource function get covert(Currency base, Currency target, decimal amount = 1.00) returns decimal {\n        decimal baseUsdValue = rates.get(base);\n        decimal targetUsdValue = rates.get(target);\n        return (targetUsdValue / baseUsdValue) * amount;\n    }\n}"
          }
        ]
      }
    ]
  },
  {
    "category": "Messaging Channels",
    "items": [
      {
        "slug": "point-to-point-channel",
        "name": "Point-to-Point Channel",
        "description": "Point-to-Point Channel ensures that only one receiver consumes any given message.",
        "helps": "<p>Ballerina supports a rich set of libraries to support various messaging protocols. These protocols support point-to-point messaging semantics. E.g.: HTTP, gRPC, GraphQL.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/PointToPointChannel.html",
        "tags": [
          "Point-to-Point Channel",
          "Message Channel",
          "Command Message"
        ],
        "category": "Messaging Channels",
        "index": 6,
        "icon": "/images/patterns/point-to-point-channel.svg",
        "codeFiles": [
          {
            "name": "point-to-point-channel.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype ProductCreationResponse record {|\n    boolean success;\n    string id;\n|};\n\nfinal http:Client zuora = check new (\"http://rest.zuora.com.balmock.io\");\n\npublic function main() returns error? {\n    var product = {\n        \"Description\": \"Cell phone service for call center operators\",\n        \"EffectiveEndDate\": \"2025-10-01\",\n        \"EffectiveStartDate\": \"2023-10-01\",\n        \"Name\": \"Cell Phone Service\",\n        \"SKU\": \"API-SKU09723199712\"\n    };\n    _ = check zuora->/v1/'object/product.post(product, targetType = ProductCreationResponse);\n}"
          }
        ]
      },
      {
        "slug": "publish-subscribe-channel",
        "name": "Publish-Subscribe Channel",
        "description": "Publish-Subscribe Channel delivers a copy of a particular event to each receiver.",
        "helps": "<p>Ballerina has a rich set of packages to interact with various messaging protocols. These include protocols that support publish-subscribe semantics such as Kafka, MQTT, and WebSocket.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/PublishSubscribeChannel.html",
        "tags": [
          "Publish-Subscribe Channel",
          "Message Channel",
          "Message Endpoint",
          "Message Router"
        ],
        "category": "Messaging Channels",
        "index": 7,
        "icon": "/images/patterns/publish-subscribe-channel.svg",
        "codeFiles": [
          {
            "name": "publisher.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\nimport ballerinax/kafka;\n\ntype MatchEvent record {|\n    string matchId;\n    string time;\n    string event;\n    string description;\n|};\n\nservice /api on new http:Listener(8080) {\n\n    private final kafka:Producer kafkaPublisher;\n\n    function init() returns error? {\n        self.kafkaPublisher = check new (kafka:DEFAULT_URL);\n    }\n\n    resource function post cricket/matches/[string matchId]/event(MatchEvent event) returns error? {\n        check self.kafkaPublisher->send({\n            topic: matchId,\n            value: event\n        });\n    }\n}"
          },
          {
            "name": "subscriber.bal",
            "language": "ballerina",
            "content": "import ballerina/uuid;\nimport ballerina/websocket;\nimport ballerinax/kafka;\n\nservice /ws on new websocket:Listener(8081) {\n\n    resource function get [string matchId]() returns websocket:Service|error {\n        return new MatchUpdateService(matchId);\n    }\n}\n\nisolated service class MatchUpdateService {\n    *websocket:Service;\n    private final kafka:Consumer kafkaConsumer;\n\n    public function init(string matchId) returns error? {\n        self.kafkaConsumer = check new (kafka:DEFAULT_URL, {\n            groupId: string `realtime-web-ui-group-${uuid:createType1AsString()}`,\n            topics: [matchId]\n        });\n    }\n\n    isolated remote function onOpen(websocket:Caller caller) returns error? {\n        while true {\n            anydata[] matchDetails = check self.kafkaConsumer->pollPayload(1);\n            from var matchDetail in matchDetails\n            do {\n                check caller->writeMessage(matchDetail);\n            };\n        }\n    }\n}"
          }
        ]
      },
      {
        "slug": "channel-adapter",
        "name": "Channel Adapter",
        "description": "The channel adapter is an interface to interact with a channel.",
        "helps": "<p>Ballerina supports a rich set of Connectors to interact with different applications. Developers can create their connectors and publish them as a package.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/ChannelAdapter.html",
        "tags": [
          "Channel Adapter",
          "Message Channel",
          "Messaging"
        ],
        "category": "Messaging Channels",
        "index": 12,
        "icon": "/images/patterns/channel-adapter.svg",
        "codeFiles": [
          {
            "name": "channel-adapter.bal",
            "language": "ballerina",
            "content": "import ballerina/io;\nimport ballerinax/jira;\n\nconfigurable string username = \"admin\";\nconfigurable string password = \"admin\";\n\nfinal jira:ConnectionConfig jiraConfig = {\n    auth: {\n        username,\n        password\n    }\n};\n\nfinal jira:Client jiraAdapter = check new (jiraConfig, \"http://wso2.jira.com.balmock.io\");\n\npublic function main() returns error? {\n    jira:Project result = check jiraAdapter->getProject(\"EI-Patterns-With-Ballerina\");\n    io:println(result.toString());\n}"
          }
        ]
      },
      {
        "slug": "messaging-bridge",
        "name": "Messaging Bridge",
        "description": "Massaging bridge connects multiple messaging systems by mapping channels and transforming message formats.",
        "helps": "<p>Single Ballerina program can connect to multiple messaging systems. Each system may utilize different protocols and message formats. Protocols such as HTTP, GRPC, Kafka, JDBC, etc. are supported via Ballerina's rich set of stranded libraries. JSON and XML are supported at the type system level. Other formats such as CSV and EDI are supported via libraries.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingBridge.html",
        "tags": [
          "Messaging Bridge",
          "Message Channel",
          "Message Endpoint",
          "Channel Adapter",
          "Message"
        ],
        "category": "Messaging Channels",
        "index": 13,
        "icon": "/images/patterns/messaging-bridge.svg",
        "codeFiles": [
          {
            "name": "messaging-bridge.bal",
            "language": "ballerina",
            "content": "import ballerina/graphql;\nimport ballerina/http;\n\ntype ProjectRequest record {|\n    string projectName;\n    string description;\n    string customerName;\n|};\n\ntype Project record {|\n    *ProjectRequest;\n    string projectID;\n    Task[] tasks;\n|};\n\ntype Task record {|\n    string taskID;\n    string description;\n|};\n\nfinal http:Client zoho = check new (\"http://zohoapis.com.balmock.io\");\n\nservice /api/v1 on new graphql:Listener(8080) {\n\n    resource function get project(string organizationID, string projectID) returns Project|error {\n        return zoho->/books/v3/projects/[projectID].get(organization_id = organizationID);\n    }\n\n    remote function createProject(string organizationID, ProjectRequest projectRequest) returns Project|error {\n        return zoho->/books/v3/projects.post(projectRequest, organization_id = organizationID);\n    }\n}"
          }
        ]
      }
    ]
  },
  {
    "category": "Message Construction",
    "items": [
      {
        "slug": "command-message",
        "name": "Command Message",
        "description": "Command message invokes a remote procedure via messages to receive a response.",
        "helps": "<p>Ballerina supports a rich set of network protocol connectors which you can use to invoke remote applications.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/CommandMessage.html",
        "tags": [
          "Command Message",
          "Messaging",
          "Point-to-Point Channel"
        ],
        "category": "Message Construction",
        "index": 15,
        "icon": "/images/patterns/command-message.svg",
        "codeFiles": [
          {
            "name": "command-message.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype UserGroupCreateRequest record {|\n    string name;\n    string description;\n    string team_id;\n|};\n\ntype UserGroup record {\n    *UserGroupCreateRequest;\n    string id;\n    boolean is_usergroup;\n    string 'handle;\n    boolean is_external;\n    int date_create;\n    string created_by;\n    string user_count;\n};\n\ntype UserGroupCreationResponse record {\n    boolean ok;\n    UserGroup usergroup?;\n    string 'error?;\n};\n\nfinal http:Client slackClient = check new (\"http://api.slack.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    isolated resource function post createUserGroup(UserGroupCreateRequest userGroup)\n    returns UserGroupCreationResponse|error {\n        return slackClient->/api/usergroups\\.create.post(userGroup, mediaType = \"x-www-form-urlencoded\");\n    }\n}"
          }
        ]
      },
      {
        "slug": "document-message",
        "name": "Document Message",
        "description": "The document message transfers data from one application to another. The focus is on the data and reliability, not on the timing of the transfer.",
        "helps": "<p>Ballerina supports sending and receiving data in multiple formats such as JSON and XML over different protocols such as HTTP, GRPC, Kafka, etc. Depending on the protocol, Ballerina provides different reliability mechanisms. As an example, the Ballerina HTTP client supports retries, load balancing, and circuit breaking.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/DocumentMessage.html",
        "tags": [
          "Document Message",
          "Message Channel",
          "Message Endpoint",
          "Point-to-Point Channel",
          "Request-Reply"
        ],
        "category": "Message Construction",
        "index": 16,
        "icon": "/images/patterns/document-message.svg",
        "codeFiles": [
          {
            "name": "document-message.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\nimport ballerina/mime;\n\ntype CsvRequest record {|\n    string org;\n    string filename;\n|};\n\ntype ZohoResponse record {|\n    string status;\n    string code;\n    string message;\n    record {|\n        string file_id;\n        string created_time;\n    |} details;\n|};\n\nfinal http:Client zohoClient = check new (\"http://content.zohoapis.com.balmock.io\",\n    // Retry 3 times with 1 second interval for error codes 404, 408, and 500.\n    retryConfig = {count: 3, interval: 1, statusCodes: [404, 408, 500]}\n);\n\nservice /crm on new http:Listener(8080) {\n    resource function post bulkUploadLeads(CsvRequest csvRequest) returns ZohoResponse|error {\n        http:Request request = new;\n        request.addHeader(\"X-CRM_ORG\", csvRequest.org);\n        request.addHeader(\"feature\", \"bulk-write\");\n        request.setFileAsPayload(\"./ftpincoming/\" + csvRequest.filename, contentType = mime:MULTIPART_FORM_DATA);\n        return zohoClient->/crm/v5/upload.post(request);\n    }\n}"
          }
        ]
      },
      {
        "slug": "event-message",
        "name": "Event Message",
        "description": "Event message notifies other applications about something that happened. Unlike document message, the focus is on the timing of the message rather than the content.",
        "helps": "<p>Ballerina packages such as HTTP, Kafka, Websocket, etc., in the Ballerina library provide listeners, through which you can consume events from other applications. Each such package provides protocol-specific message sending APIs as well.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/EventMessage.html",
        "tags": [
          "Event Message",
          "Command Message",
          "Point-to-Point Channel"
        ],
        "category": "Message Construction",
        "index": 17,
        "icon": "/images/patterns/event-message.svg",
        "codeFiles": [
          {
            "name": "event-message.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\nimport ballerina/mime;\nimport ballerina/url;\n\ntype IncidentRequest record {\n    string phoneNo;\n    Incident incident;\n};\n\ntype Incident record {|\n    string description;\n    string date;\n    string time;\n|};\n\nconst FROM_NO = \"+15005550006\";\nconst API_VERSION = \"2010-04-01\";\nconst TWILIO_SID = \"VBC1849a56d52g41s4b2b2cc004c0027aa8\";\n\nfinal http:Client twilio = check new (\"http://api.twilio.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    resource function post incidents(IncidentRequest req) returns error? {\n        string body = string `Incident ${req.incident.description} reported: \n                              ${req.incident.date} at ${req.incident.time}.`;\n        http:Request twilioReq = new;\n        string payload = \"From=\" + check url:encode(FROM_NO, \"utf-8\") +\n                         \"&To=\" + check url:encode(req.phoneNo, \"utf-8\") +\n                         \"&Body=\" + check url:encode(body, \"utf-8\");\n        twilioReq.setTextPayload(payload, contentType = mime:APPLICATION_FORM_URLENCODED);\n        _ = check twilio->/[API_VERSION]/Accounts/[TWILIO_SID]/Messages\\.json.post(twilioReq,\n            targetType = http:Response\n        );\n    }\n}"
          }
        ]
      },
      {
        "slug": "correlation-identifier",
        "name": "Correlation Identifier",
        "description": "A correlation Identifier is a unique identifier that indicates which request message this reply is for.",
        "helps": "<p>Ballerina can send and receive messages over multiple protocols. Ballerina supports extracting and injecting information into the messages. The extracted information can be stored for later use as a correlation identifier. Module-level variables can be used for temporary storage. For a more robust solution, Ballerina provides a rich set of packages to interact with databases and key-value stores, such as SQL and Redis.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/CorrelationIdentifier.html",
        "tags": [
          "Correlation Identifier",
          "Request Reply",
          "Selective Consumer",
          "Messsage"
        ],
        "category": "Message Construction",
        "index": 20,
        "icon": "/images/patterns/correlation-identifier.svg",
        "codeFiles": [
          {
            "name": "correlation-identifier.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\nimport ballerinax/kafka;\n\ntype OrderRequest record {|\n    string orderId;\n    string name;\n    string address;\n    string phoneNumber;\n    OrderItem[] items;\n|};\n\ntype OrderItem record {|\n    string itemCode;\n    int quantity;\n    float unitPrice;\n|};\n\ntype InvoiceDetails record {|\n    string orderId;\n    string invoiceId;\n|};\n\nconst INVOICE_GENERATING = \"INVOICE_GENERATING\";\nconst INVOICE_GENERATED = \"INVOICE_GENERATED\";\n\ntype InvoiceGenerating record {|\n    INVOICE_GENERATING status = INVOICE_GENERATING;\n|};\n\ntype InvoiceGenerated record {|\n    INVOICE_GENERATED status = INVOICE_GENERATED;\n    string invoiceId;\n|};\n\nfinal map<InvoiceGenerating|InvoiceGenerated> processedOrders = {};\n\nservice /api/v1 on new http:Listener(8080) {\n\n    private final kafka:Producer kafkaPublisher;\n\n    function init() returns error? {\n        self.kafkaPublisher = check new (kafka:DEFAULT_URL);\n    }\n\n    resource function post process/'order(OrderRequest orderRequest) returns error? {\n        check self.kafkaPublisher->send({\n            topic: \"order-events\",\n            value: orderRequest\n        });\n        processedOrders[orderRequest.orderId] = {\n            \"status\": INVOICE_GENERATING\n        };\n    }\n}\n\nlistener kafka:Listener orderListener = new (kafka:DEFAULT_URL, {\n    groupId: \"order-group-id\",\n    topics: \"invoice-events\"\n});\n\nservice on orderListener {\n    remote function onConsumerRecord(InvoiceDetails[] invoices) returns error? {\n        foreach var invoice in invoices {\n            processedOrders[invoice.orderId] = {\n                \"status\": INVOICE_GENERATED,\n                \"invoiceId\": invoice.invoiceId\n            };\n        }\n    }\n}"
          }
        ]
      },
      {
        "slug": "message-sequence",
        "name": "Message Sequence",
        "description": "Message sequence sends the data as a sequence of messages and marks each message with sequence identification fields.",
        "helps": "<p>Ballerina supports loop constructs such as <code>while</code>, <code>foreach</code>, and <code>map</code>. These constructs can be used to iterate over data and send it in chunks. Program state can be kept in variables.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageSequence.html",
        "tags": [
          "Message Sequence",
          "Message Channel",
          "Message Endpoint",
          "Message"
        ],
        "category": "Message Construction",
        "index": 21,
        "icon": "/images/patterns/message-sequence.svg",
        "codeFiles": [
          {
            "name": "message-sequence.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\nimport ballerina/io;\n\nfinal http:Client s3Client = check new (\"http://noname-tech.s3.amazonaws.com.balmock.io\");\n\npublic function main() returns error? {\n    http:Response metaData = check s3Client->/employee_names.head();\n    int fileSize = check int:fromString(check metaData.getHeader(\"Content-Length\"));\n\n    check io:fileWriteBytes(\"./resources/employee_names.txt\", []);\n\n    int numberOfChunks = (fileSize + 10 - 1) / 10;\n    // Download the data chunk by chunk.\n    foreach int i in 0 ..< numberOfChunks {\n        map<string> headers = {Range: string `bytes=${10 * i}-${10 * (i + 1) - 1}`};\n        http:Response s3Response = check s3Client->/employee_names.get(headers = headers);\n        byte[] chunkData = check s3Response.getBinaryPayload();\n        check io:fileWriteBytes(\"./resources/employee_names.txt\", chunkData, io:APPEND);\n    }\n}"
          }
        ]
      },
      {
        "slug": "format-indicator",
        "name": "Format Indicator",
        "description": "The Format Indicator will identify the message format based on the version or structure and process it.",
        "helps": "<p>The <code>is</code> keyword in Ballerina distinguishes between structured types, aiding in distinguishing various message versions.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/FormatIndicator.html",
        "tags": [
          "Format Indicator",
          "Cannonical Data Model"
        ],
        "category": "Message Construction",
        "index": 23,
        "icon": "/images/patterns/format-indicator.svg",
        "codeFiles": [
          {
            "name": "format-indicator.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\npublic type PatientReqV1 record {|\n    \"1.0\" version = \"1.0\";\n    string firstName;\n    string lastName;\n    string dob;\n    string diagnosis;\n|};\n\npublic type PatientReqV2 record {|\n    \"2.0\" version = \"2.0\";\n    Patient patient;\n|};\n\ntype PatientReq PatientReqV1|PatientReqV2;\n\npublic type Patient record {|\n    string fullName;\n    string dob;\n    string diagnosis;\n|};\n\nfinal http:Client patientClient = check new (\"http://api.patients.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function post data/patient(PatientReq patintReq) returns error? {\n        Patient patient;\n        if patintReq is PatientReqV1 {\n            patient = {\n                dob: patintReq.dob,\n                fullName: patintReq.firstName + \" \" + patintReq.lastName,\n                diagnosis: patintReq.diagnosis\n            };\n        } else {\n            patient = {\n                dob: patintReq.patient.dob,\n                fullName: patintReq.patient.fullName,\n                diagnosis: patintReq.patient.diagnosis\n            };\n        }\n        _ = check patientClient->/patient.post(patient, targetType = http:Response);\n    }\n\n    resource function post patient(Patient patient) returns error? {\n        _ = check patientClient->/patient.post(patient, targetType = http:Response);\n    }\n}"
          }
        ]
      }
    ]
  },
  {
    "category": "Message Routing",
    "items": [
      {
        "slug": "content-based-router",
        "name": "Content-Based Router",
        "description": "Content-based router routes each message to the correct recipient based on message content.",
        "helps": "<p>Ballerina supports conditional logic with if-else and match statements. This can be used to route messages based on message content, header, or any custom logic. Ballerina type system supports union types (e.g., <code>Country</code> enum below is a union), which helps to define choices in a type-safe and readable manner.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/ContentBasedRouter.html",
        "tags": [
          "Content Based Router",
          "Message Filter",
          "Dynamtic Router"
        ],
        "category": "Message Routing",
        "index": 24,
        "icon": "/images/patterns/content-based-router.svg",
        "codeFiles": [
          {
            "name": "content-based-router.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype DhlUkResponse record {|\n    string url;\n    record {|\n        string id;\n        Status status;\n    |}[] shipments;\n|};\n\ntype DhlDpiResponse record {|\n    Status[] events;\n    string publicUrl;\n    string barcode;\n|};\n\ntype Status record {|\n    string statusCode;\n    string status;\n|};\n\nenum Country {\n    UK,\n    DE\n}\n\ntype TrackingRequest record {|\n    Country country;\n    string tracking_id;\n|};\n\nfinal http:Client dhl = check new (\"http://api.dhl.com.balmock.io\");\n\nservice /shipments on new http:Listener(8080) {\n\n    resource function post status(TrackingRequest request) returns string|error {\n        match request.country {\n            UK => {\n                DhlUkResponse response = check dhl->/parceluk/tracking/v1/shipments(trackingNumber = request.tracking_id);\n                return response.shipments[0].status.status;\n            }\n            DE => {\n                DhlDpiResponse response = check dhl->/dpi/tracking/v1/trackings/[request.tracking_id];\n                return response.events[0].status;\n            }\n            _ => {\n                return error(\"County not supported\");\n            }\n        }\n    }\n}"
          }
        ]
      },
      {
        "slug": "message-filter",
        "name": "Message Filter",
        "description": "Message filter neglects the uninterested messages based on criteria and publishes the filtered message to another channel.",
        "helps": "<p>Ballerina enables filtering messages using basic control structures such as if and switch statements.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Filter.html",
        "tags": [
          "Message Filter",
          "Message Channel",
          "Message Endpoint"
        ],
        "category": "Message Routing",
        "index": 25,
        "icon": "/images/patterns/message-filter.svg",
        "codeFiles": [
          {
            "name": "message-filter.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype Ticket record {|\n    string id;\n    string url;\n    string subject;\n    HIGH_PRIORITY|MEDUIM_PRIORITY|LOW_PRIORITY priority;\n|};\n\nconst HIGH_PRIORITY = 1;\nconst MEDUIM_PRIORITY = 2;\nconst LOW_PRIORITY = 3;\n\nfinal http:Client notificationChannel = check new (\"http://api.notification.channel.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function post ticket(Ticket ticket) returns error? {\n        if ticket.priority == 1 {\n            _ = check notificationChannel->/email/notify.post(ticket, targetType = http:Response);\n        }\n    }\n}"
          }
        ]
      },
      {
        "slug": "recipient-list",
        "name": "Recipient List",
        "description": "The recipient list pattern inspects an incoming message, determines the list of desired recipients, and forwards the message to all channels associated with the recipients in the list.",
        "helps": "<p>Ballerina can extract information from messages and execute logic based on that. Iteration constructs such as <code>foreach</code> and <code>while</code> and query expressions can be used to execute a given logic for each recipient. Ballerina supports sending multiple messages in a single incoming message.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/RecipientList.html",
        "tags": [
          "Recipient List",
          "Content Based Router",
          "Message Router"
        ],
        "category": "Message Routing",
        "index": 27,
        "icon": "/images/patterns/recipient-list.svg",
        "codeFiles": [
          {
            "name": "recipient-list.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype Recipient readonly & record {|\n    string recpientId;\n    string catergory;\n    string contact;\n    \"EMAIL\"|\"SMS\"|\"NOTIFICATION\" subscription;\n|};\n\ntype Message readonly & record {|\n    string subject?;\n    string body;\n    string signature?;\n|};\n\nfinal map<Recipient[]> recipientList = {};\n\nfinal http:Client emailManagerClient = check new (\"http://api.email.manager.com.balmock.io\");\nfinal http:Client smsManagerClient = check new (\"http://api.sms.manager.com.balmock.io\");\nfinal http:Client notificationManagerClient = check new (\"http://api.notification.manager.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function post quotes/[string catergory](Message message) returns error? {\n        foreach var {contact, subscription} in recipientList.get(catergory) {\n            match subscription {\n                \"EMAIL\" => {\n                    _ = check emailManagerClient->/send/[contact].post(message, targetType = http:Response);\n                }\n                \"SMS\" => {\n                    _ = check smsManagerClient->/send/[contact].post(message, targetType = http:Response);\n                }\n                \"NOTIFICATION\" => {\n                    _ = check notificationManagerClient->/send/[contact].post(message, targetType = http:Response);\n                }\n            }\n        }\n    }\n}"
          }
        ]
      },
      {
        "slug": "splitter",
        "name": "Splitter",
        "description": "Splitter splits the message into multiple messages, each containing one of the elements.",
        "helps": "<p>Ballerina supports arrays and maps as first-class data structures. These structures can be iterated over using <code>foreach</code> and query expressions.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Sequencer.html",
        "tags": [
          "Splitter",
          "Content Filter",
          "Event Message"
        ],
        "category": "Message Routing",
        "index": 28,
        "icon": "/images/patterns/splitter.svg",
        "codeFiles": [
          {
            "name": "splitter.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\nimport ballerina/mime;\nimport ballerina/url;\n\ntype ReminderRequest record {\n    string date;\n    Event[] events;\n};\n\ntype Event record {|\n    string eventName;\n    Attendee[] attendees;\n|};\n\ntype Attendee record {|\n    string name;\n    string number;\n|};\n\nconst FROM_NO = \"+15005550006\";\nconst TWILIO_SID = \"VAC1829a53d52f41b4b2b1cc003c0026aa8\";\nconst API_VERSION = \"2010-04-01\";\n\nfinal http:Client twilio = check new (\"http://api.twilio.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    resource function post reminders(ReminderRequest request) returns error? {\n        foreach var event in request.events {\n            foreach var attendee in event.attendees {\n                check sendReminder(attendee, event.eventName, request.date);\n            }\n        }\n    }\n}\n\nfunction sendReminder(Attendee attendee, string eventName, string date) returns error? {\n    string body = string `Hi ${attendee.name}, looking forward to meet you at the ${eventName} on ${date}`;\n    string payload = \"From=\" + check url:encode(FROM_NO, \"utf-8\") +\n                     \"&To=\" + check url:encode(attendee.number, \"utf-8\") +\n                     \"&Body=\" + check url:encode(body, \"utf-8\");\n    http:Request twilioReq = new;\n    twilioReq.setTextPayload(payload, contentType = mime:APPLICATION_FORM_URLENCODED);\n    _ = check twilio->/[API_VERSION]/Accounts/[TWILIO_SID]/Messages\\.json.post(twilioReq, targetType = http:Response);\n}"
          }
        ]
      },
      {
        "slug": "aggregator",
        "name": "Aggregator",
        "description": "Aggregator patiently collects a sequence of messages and combines them once all have been received.",
        "helps": "<p>Ballerina provides convenient map and table data structures for temporary message storage. Ballerina provides robust support for distributed storage with the Redis package. Additionally, it offers seamless integration with various SQL and NoSQL databases for persistent data storage. Ballerina's cache package is an efficient in-memory cache solution that includes automatic cleanup mechanisms.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Aggregator.html",
        "tags": [
          "Aggregator"
        ],
        "category": "Message Routing",
        "index": 29,
        "icon": "/images/patterns/aggregator.svg",
        "codeFiles": [
          {
            "name": "aggregator.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\nfinal map<json[]> partialSurveys = {};\n\nfinal http:Client formSubmitClient = check new (\"http://api.surveyme.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function post survey/[string id](@http:Header string userId, @http:Payload json formData) returns error? {\n        json[]? surveyData = partialSurveys[userId];\n        if surveyData == () {\n            json[] newSurvey = [formData];\n            partialSurveys[userId] = newSurvey;\n        } else {\n            surveyData.push(formData);\n            if surveyData.length() == 3 {\n                _ = check formSubmitClient->/survey/[id]/submit.post({userId: surveyData}, targetType = http:Response);\n                _ = partialSurveys.remove(userId);\n            }\n        }\n    }\n}"
          }
        ]
      },
      {
        "slug": "resequencer",
        "name": "Resequencer",
        "description": "Resequencer reorders the sequence of messages received in the incorrect order.",
        "helps": "<p>Ballerina provides convenient map and table data structures for temporary message storage. The query expressions enable sorting arrays based on one or more item attributes.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Resequencer.html",
        "tags": [
          "Resequencer"
        ],
        "category": "Message Routing",
        "index": 30,
        "icon": "/images/patterns/resequencer.svg",
        "codeFiles": [
          {
            "name": "resequencer.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype Approval record {\n    TEAM_LEAD|MANAGER|SENIOR_MANAGER leadLevel;\n    int score;\n    int nextPromotionLevel;\n};\n\nconst TEAM_LEAD = 1;\nconst MANAGER = 2;\nconst SENIOR_MANAGER = 3;\n\nfinal map<Approval[]> incompleteApprovals = {};\n\nfinal http:Client hrClient = check new (\"http://api.wso2hr.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function post employees/[string emoloyeeId]/approval(Approval approvalReq) returns error? {\n        Approval[]? approvals = incompleteApprovals[emoloyeeId];\n        if approvals == () {\n            incompleteApprovals[emoloyeeId] = [approvalReq];\n            return;\n        }\n        approvals.push(approvalReq);\n        if approvals.length() < 3 {\n            return;\n        }\n        from Approval approval in approvals\n        order by approval.leadLevel\n        do {\n            _ = check hrClient->/promotions/employees/[emoloyeeId]/approval.post(approval, targetType = json);\n        };\n        _ = incompleteApprovals.remove(emoloyeeId);\n    }\n}"
          }
        ]
      },
      {
        "slug": "composed-message-processor",
        "name": "Composed Message Processor",
        "description": "Composed Message Processor splits the message up, routes the sub-messages to the appropriate destinations and re-aggregates the responses back into a single message.",
        "helps": "<p>Ballerina has <code>foreach</code>, <code>while</code> and query expressions to iterate over data. During iteration, Ballerina can send and receive messages. Ballerina can extract, manipulate and store data in messages using variables.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/DistributionAggregate.html",
        "tags": [
          "Composed Message Processor",
          "Aggregator",
          "Content Based Router"
        ],
        "category": "Message Routing",
        "index": 31,
        "icon": "/images/patterns/composed-message-processor.svg",
        "codeFiles": [
          {
            "name": "composed-message-processor.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype SalesByStateRequest record {|\n    string[] states;\n|};\n\ntype SalesByState record {|\n    decimal revenue;\n    decimal operatingExpenses;\n    int production;\n    int totalEmployees;\n|};\n\ntype AggregratedSales record {|\n    map<decimal> revenueByState = {};\n    decimal totalRevenue = 0.0;\n    decimal maxRevenue = 0.0;\n    string maxRevenueState = \"\";\n    map<decimal> operatingExpensesByState = {};\n    decimal totalOperatingExpenses = 0.0;\n    int totalProduction = 0;\n    map<int> productivityByState = {};\n|};\n\nfinal map<http:Client> stateRoutes = {\n    Texas: check new (\"http://api.texas.office.com.balmock.io\"),\n    Ohio: check new (\"http://api.ohio.office.com.balmock.io\"),\n    Florida: check new (\"http://api.florida.office.com.balmock.io\")\n};\n\nservice /api/v1 on new http:Listener(8080) {\n    resource function post dashboard(SalesByStateRequest salesRequest) returns AggregratedSales|error {\n        AggregratedSales summary = {};\n        foreach string state in salesRequest.states {\n            http:Client? stateClient = stateRoutes[state];\n            if stateClient == () {\n                return error(\"Invalid state provided\");\n            }\n            SalesByState salesByState = check stateClient->/sales();\n            aggregateSales(summary, state, salesByState);\n        }\n        return summary;\n    }\n}\n\nfunction aggregateSales(AggregratedSales summary, string state, SalesByState salesByState) {\n    summary.revenueByState[state] = salesByState.revenue;\n    summary.totalRevenue += salesByState.revenue;\n    summary.operatingExpensesByState[state] = salesByState.operatingExpenses;\n    summary.totalOperatingExpenses += salesByState.operatingExpenses;\n    summary.totalProduction += salesByState.production;\n    summary.maxRevenueState = summary.maxRevenue < salesByState.revenue ? state : summary.maxRevenueState;\n    summary.maxRevenue = summary.maxRevenue < salesByState.revenue ? salesByState.revenue : summary.maxRevenue;\n    summary.productivityByState[state] = salesByState.production / salesByState.totalEmployees;\n}"
          }
        ]
      },
      {
        "slug": "scatter-gather",
        "name": "Scatter-Gather",
        "description": "Scatter-gather broadcasts a message to multiple recipients and re-aggregates the responses back into a single message.",
        "helps": "<p>Ballerina has a lightweight <a href=\"/learn/by-example/named-workers/\">concurrency</a> model with built-in syntax support. This helps to send messages parallelly and to wait on aggregation. Query expressions are convenient for transforming, ordering, and filtering the aggregated data.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/BroadcastAggregate.html",
        "tags": [
          "Scatter-Gather",
          "Aggregator",
          "Message Channel",
          "Message Endpoint",
          "Message Router",
          "Message"
        ],
        "category": "Message Routing",
        "index": 32,
        "icon": "/images/patterns/scatter-gather.svg",
        "codeFiles": [
          {
            "name": "scatter-gather.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype CarRental record {|\n    string carType;\n    string price;\n    string resultLink;\n    string vendor;\n|};\n\ntype AvisResponse record {\n    record {\n        *CarRental;\n    }[] result;\n};\n\nfinal http:Client hotwireEP = check new (\"http://api.hotwire.com.balmock.io\");\nfinal http:Client avisEP = check new (\"http://api.avis.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function get vehicles(string dropOffDateTime, string dropOffLocation, string pickupDateTime,\n            string pickupLocation) returns map<CarRental[]>|error {\n\n        worker hotwire returns CarRental[]|error {\n            http:Response hotwireResponse = check hotwireEP->/v1/search/car.get(pickup = pickupLocation,\n                dest = dropOffLocation, startDate = pickupDateTime, endDate = dropOffDateTime\n            );\n            return transformHotwireResponse(check hotwireResponse.getXmlPayload());\n        }\n\n        worker avis returns CarRental[]|error {\n            AvisResponse avisResponse = check avisEP->/cars/catalog/v1/vehicles/rates.get(brand = \"Avis\",\n                country_code = \"US\", dropOff_date = dropOffDateTime, dropoff_location = dropOffLocation,\n                pickup_date = pickupDateTime, pickup_location = pickupLocation\n            );\n            return transformAvisResponse(avisResponse);\n        }\n\n        var responses = wait {hotwire, avis};\n        return map from var [vendor, carRental] in responses.entries()\n            where carRental !is error\n            select [vendor, carRental];\n    }\n}\n\nfunction transformHotwireResponse(xml response) returns CarRental[] {\n    return from xml item in response/<Response>/<Car>\n        select {\n            carType: (item/<CarType>).data(),\n            price: (item/<Price>).data(),\n            resultLink: (item/<ResultLink>).data(),\n            vendor: \"Hotwire\"\n        };\n}\n\nfunction transformAvisResponse(AvisResponse response) returns CarRental[] {\n    return from var {carType, price, resultLink, vendor} in response.result\n        select {carType, price, resultLink, vendor};\n}"
          }
        ]
      },
      {
        "slug": "routing-slip",
        "name": "Routing Slip",
        "description": "Route the message to the next component according to the sequence of processing steps specified in a routing slip.",
        "helps": "<p>Ballerina excels in enabling the seamless integration of diverse services with inherent concurrent support, as well as in data binding, type enforcement, and native error-handling capabilities.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/RoutingTable.html",
        "tags": [
          "Routing Slip",
          "Message Channel",
          "Message Endpoint",
          "Message Router"
        ],
        "category": "Message Routing",
        "index": 33,
        "icon": "/images/patterns/routing-slip.svg",
        "codeFiles": [
          {
            "name": "routing-slip-main.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype PaymentRequest record {|\n    string mobileNumber;\n    string customerName;\n    float totalAmount;\n    string storeCode;\n    record {}[] items;\n|};\n\ntype PaymentStatus record {|\n    string status;\n    record {\n        float totalPoints;\n        float redeemedAmount;\n        float totalAmount;\n    } details;\n|};\n\ntype Message record {|\n    *PaymentRequest;\n    string storeCode;\n    string[] routingSlip = [];\n|};\n\ntype Points record {\n    float loyaltyPoints = 0.0;\n    float mobilePoints = 0.0;\n};\n\nservice /api/v1 on new http:Listener(8080) {\n    resource function post payments(PaymentRequest request) returns PaymentStatus|error {\n        string[] routingSlip = check lookupMessageSlip(request);\n        Message message = {...request, routingSlip: routingSlip};\n        Points points = {};\n        if message.routingSlip.length() > 0 {\n            http:Client pointHandler = check new (\"http://localhost:8081/loyaltyPoints\");\n            json payload = {\n                storeCode: message.storeCode,\n                mobileNumber: message.mobileNumber,\n                routingSlip: message.routingSlip\n            };\n            points = check pointHandler->/points.post(payload);\n        }\n        return checkout(message, points);\n    }\n}\n\nfunction checkout(Message message, Points points) returns PaymentStatus {\n    float totalPoints = points.loyaltyPoints + points.mobilePoints;\n    return {\n        status: \"SUCCESS\",\n        details: {\n            totalPoints: totalPoints,\n            redeemedAmount: totalPoints * 50,\n            totalAmount: message.totalAmount - (totalPoints * 50)\n        }\n    };\n}\n\nfunction lookupMessageSlip(PaymentRequest request) returns string[]|error {\n    http:Client openLoyalty = check new (\"http://openloyalty.com.balmock.io\");\n    anydata|error customer = openLoyalty->/api/[request.storeCode]/member/'check/get();\n    string[] routingSlip = [];\n    if customer is anydata {\n        routingSlip.push(\"CustomerLoyaltyPoints\");\n    }\n    if check isRegisteredToPointsService(request.mobileNumber) {\n        routingSlip.push(\"MobilePoints\");\n    }\n    return routingSlip;\n}\n\nfunction isRegisteredToPointsService(string mobileNumber) returns boolean|error {\n    http:Client openLoyalty = check new (\"http://mob.points.hub.com.balmock.io\");\n    anydata|error memberCheck = openLoyalty->/api/[mobileNumber]/member/'check/get();\n    return memberCheck is error ? false : true;\n}"
          },
          {
            "name": "loyalty-point-service.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype Request record {|\n    string storeCode;\n    string mobileNumber;\n    string[] routingSlip;\n|};\n\ntype Points record {|\n    float loyaltyPoints = 0.0;\n    float mobilePoints = 0.0;\n    float crypto = 0.0;\n|};\n\nservice /loyaltyPoints on new http:Listener(8081) {\n    resource function post points(Request request) returns Points|error {\n        Points totalPoints = {};\n        foreach string process in request.routingSlip {\n            match process {\n                \"CustomerLoyaltyPoints\" => {\n                    totalPoints.loyaltyPoints = check getShopLoyaltiPoints(request);\n                }\n                \"MobilePoints\" => {\n                    totalPoints.mobilePoints = check getMobilePoints(request);\n                }\n                \"Crypto\" => {\n                    totalPoints.crypto = check getCrypto(request);\n                }\n            }\n        }\n        return totalPoints;\n    }\n}\n\nfunction getShopLoyaltiPoints(Request request) returns float|error {\n    http:Client openLoyalty = check new (\"http://openloyalty.customer.com.balmock.io\");\n    record {float loyaltyPoints;} points = check openLoyalty->/api/[request.storeCode]/redemption/[request.mobileNumber].get();\n    return points.loyaltyPoints;\n}\n\nfunction getMobilePoints(Request request) returns float|error {\n    http:Client mobPoints = check new (\"http://mob.points.com.balmock.io\");\n    record {float mobilePoints;} points = check mobPoints->/api/[request.mobileNumber]/redemption.get();\n    return points.mobilePoints;\n}\n\nfunction getCrypto(Request request) returns float|error {\n    http:Client crypto = check new (\"http://crypto.com.balmock.io\");\n    record {float crypto;} points = check crypto->/api/[request.mobileNumber].get();\n    return points.crypto;\n}"
          }
        ]
      },
      {
        "slug": "process-manager",
        "name": "Process Manager",
        "description": "The process manager orchestrates a sequence of steps that are not known at design time.",
        "helps": "<p>Ballerina provides control flow constructs such as <code>if</code>-<code>else</code> and <code>match</code> statements to implement complex process flows.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/ProcessManager.html",
        "tags": [
          "Process Manager",
          "Command Message",
          "Aggregator",
          "Point-to-Point Channel"
        ],
        "category": "Message Routing",
        "index": 34,
        "icon": "/images/patterns/process-manager.svg",
        "codeFiles": [
          {
            "name": "process-manager.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype OrderRequest record {|\n    string email;\n    Address address;\n    OrderItemRequest[] orderItems;\n|};\n\ntype OrderResponse record {|\n    string email;\n    string currency;\n    float total;\n    Address address;\n    OrderItemResponse[] orderItems;\n    string trackingNumber;\n|};\n\ntype Address record {|\n    string fullName;\n    string address1;\n    string phone;\n    string city;\n    string country;\n|};\n\ntype OrderItemRequest record {\n    string itemName;\n    int quantity;\n};\n\ntype OrderItemResponse record {|\n    string itemName;\n    int quantity;\n    float price;\n    string currencyCode;\n|};\n\ntype ShipmentRequest record {|\n    float amount;\n    string currency;\n    string personName;\n    string email;\n    DHLAddress|FedexAddress address;\n|};\n\ntype FedexAddress record {|\n    string address1;\n    string city;\n    string country;\n    string phoneNumber;\n|};\n\ntype DHLAddress record {|\n    string name;\n    *FedexAddress;\n|};\n\ntype FedexResponse record {|\n    string transactionId;\n    string trackingNumber;\n|};\n\ntype DHLResponse record {|\n    string trackingNumber;\n|};\n\nfinal http:Client shopify = check new (\"http://BlackwellsBooks.myshopify.com.balmock.io\");\nfinal http:Client dhlExpress = check new (\"http://express.api.dhl.com.balmock.io\");\nfinal http:Client fedEx = check new (\"http://api.fedex.com.balmock.io\");\nfinal http:Client sendgrid = check new (\"http://api.sendgrid.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    resource function post orders(OrderRequest orderReq) returns error? {\n        OrderResponse response = check shopify->/admin/api/orders\\.json.post(orderReq);\n        string trackingNumber;\n        if response.address.country == \"United States\" {\n            FedexResponse fedexResp = check createFedexShipment(response);\n            trackingNumber = fedexResp.trackingNumber;\n        } else {\n            DHLResponse dhlResp = check creeateDhlShipment(response);\n            trackingNumber = dhlResp.trackingNumber;\n        }\n        var _ = start sendConfirmationMail(response.address.fullName, response.email, trackingNumber);\n    }\n}\n\nfunction createFedexShipment(OrderResponse response) returns FedexResponse|error {\n    ShipmentRequest fedexReq = {\n        amount: response.total,\n        currency: response.currency,\n        personName: response.address.fullName,\n        email: response.email,\n        address: {\n            address1: response.address.address1,\n            city: response.address.city,\n            country: response.address.country,\n            phoneNumber: response.address.phone\n        }\n    };\n\n    return check fedEx->/api/en\\-us/catalog/ship/v1/shipments.post(fedexReq);\n\n}\n\nfunction creeateDhlShipment(OrderResponse response) returns DHLResponse|error {\n    ShipmentRequest dhlReq = {\n        amount: response.total,\n        currency: response.currency,\n        personName: response.address.fullName,\n        email: response.email,\n        address: {\n            name: response.address.fullName,\n            address1: response.address.address1,\n            city: response.address.city,\n            country: response.address.country,\n            phoneNumber: response.address.phone\n        }\n    };\n\n    return check dhlExpress->/mydhlapi/shipments.post(dhlReq);\n}\n\nfunction sendConfirmationMail(string name, string email, string trackingNumber) returns error? {\n    string body = string `<p>Hello ${name}!</p><p>Your Order has been shipped. ` +\n                  string `Track your order using ${trackingNumber}</p>`;\n    var mailReq = {\n        toInfo: email,\n        fromInfo: \"orders@blackwell.com\",\n        subject: \"Order Confirmation\",\n        content: body\n    };\n\n    _ = check sendgrid->/v3/mail/send.post(mailReq, targetType = json);\n}"
          }
        ]
      }
    ]
  },
  {
    "category": "Message Transformation",
    "items": [
      {
        "slug": "envelope-wrapper",
        "name": "Envelope Wrapper",
        "description": "Envelope Wrapper wraps application data inside an envelope that is compliant with the messaging infrastructure.",
        "helps": "<p>Ballerina provides a rich set of libraries to interact with various messaging protocols. Ballerina allows you to extract information from messages and create new messages, manipulating data in both the body and the header.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/EnvelopeWrapper.html",
        "tags": [
          "Envelope Wrapper",
          "Content Enricher",
          "Message Channel",
          "Message"
        ],
        "category": "Message Transformation",
        "index": 36,
        "icon": "/images/patterns/envelope-wrapper.svg",
        "codeFiles": [
          {
            "name": "envelope-wrapper.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype RefundRequest record {|\n    string request_id;\n    string email;\n    string client_id;\n    string capture_id;\n|};\n\ntype PaypalRespose record {|\n    string status;\n    string message;\n|};\n\nfinal http:Client paypalClient = check new (\"http://api-m.sandbox.paypal.com.balmock.io\");\nfinal string encodedHeader = {alg: \"none\"}.toString().toBytes().toBase64();\n\nservice /paypal on new http:Listener(8080) {\n    resource function post refund(RefundRequest refundReq) returns PaypalRespose|error {\n        // Generate PayPal-Auth-Assertion.\n        string authAssertionValue = getAuthAssertionValue(refundReq.client_id, refundReq.email);\n\n        http:Request request = new;\n        request.addHeader(\"PayPal-Request-Id\", refundReq.request_id);\n        request.addHeader(\"PayPal-Auth-Assertion\", authAssertionValue);\n        return paypalClient->/v2/payments/captures/[refundReq.capture_id]/refund.post(request);\n    }\n}\n\nisolated function getAuthAssertionValue(string client_id, string email) returns string {\n    map<string> payload = {\n        iss: client_id,\n        payer_id: email\n    };\n    string encodedPayload = payload.toString().toBytes().toBase64();\n    return string `${encodedHeader}.${encodedPayload}.`;\n}"
          }
        ]
      },
      {
        "slug": "content-enricher",
        "name": "Content Enricher",
        "description": "Content enricher adds data that was not sent by the original sender to the message.",
        "helps": "<p>Ballerina enables additional lookups to enrich the message, such as database lookups, REST API calls, etc. Spread operator (...) helps to create new records out of existing records while enriching them with additional data.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/DataEnricher.html",
        "tags": [
          "Content Enricher",
          "Message Channel",
          "Message Endpoint",
          "Message"
        ],
        "category": "Message Transformation",
        "index": 37,
        "icon": "/images/patterns/content-enricher.svg",
        "codeFiles": [
          {
            "name": "content-enricher.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype BankAccountReq record {|\n    string name;\n    string accountNumber;\n    string routingNumber;\n    string? country;\n|};\n\ntype IbanRequest record {|\n    \"json\"|\"xml\" format = \"json\";\n    string country_iso;\n    string nid;\n|};\n\ntype IbanResponse record {\n    string bank_code;\n};\n\ntype BankAccount record {\n    *BankAccountReq;\n    string id;\n    string? bankCode;\n};\n\nfinal http:Client iban = check new (\"http://api.iban.com.balmock.io\");\nfinal http:Client intuit = check new (\"http://api.intuit.com.balmock.io\");\n\nservice /finance on new http:Listener(8080) {\n\n    resource function post customers/[int id]/accounts(BankAccountReq req) returns BankAccount|error {\n        IbanRequest ibanReq = {country_iso: req.country ?: \"US\", nid: req.accountNumber};\n        IbanResponse ibanRes = check iban->/clients/api/banksuite/nid.post(ibanReq);\n        return check intuit->/quickbooks/v4/customers/[id]/bank\\-accounts.post({...req, bankCode: ibanRes.bank_code});\n    }\n}"
          }
        ]
      },
      {
        "slug": "content-filter",
        "name": "Content Filter",
        "description": "The content filter removes data from the original message and can also be employed to simplify the message structure.",
        "helps": "<p>Ballerina excels at manipulating data and handling diverse formats, structures, and transformations. The <a href=\"/learn/by-example/query-expressions/\">query expression</a> (<code>from</code> keyword) is useful for transforming messages. The <code>select</code> clause, as shown below, can be used to create new records from existing ones while refining data. The <code>where</code> clause can be used to filter items from an array.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/ContentFilter.html",
        "tags": [
          "Content Filter",
          "Message Channel",
          "Message Endpoint"
        ],
        "category": "Message Transformation",
        "index": 38,
        "icon": "/images/patterns/content-filter.svg",
        "codeFiles": [
          {
            "name": "content-filter.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype DetailedReimbursementTemplate record {\n    string reimbursementTypeID;\n    string reimbursementTypeName;\n    float fixedAmount;\n};\n\ntype ReimbursementTemplate record {\n    string reimbursementTypeID;\n    float fixedAmount;\n};\n\ntype Reimbursement record {\n    string id;\n    record {\n        string reimbursementTypeID;\n        float fixedAmount;\n    }[] reimbursementTemplates;\n};\n\nfinal http:Client xero = check new (\"http://api.xero.com.balmock.io\");\n\nservice /payroll on new http:Listener(8080) {\n\n    resource function post employees/[string id]/paytemplate/reimbursements(DetailedReimbursementTemplate[] templates)\n            returns Reimbursement|error {\n        ReimbursementTemplate[] reimbursementRequests = from var {reimbursementTypeID, fixedAmount} in templates\n                                                        select {reimbursementTypeID, fixedAmount};\n        return xero->/payrollxro/employees/[id]/paytemplate/reimbursements.post(reimbursementRequests);\n    }\n}"
          }
        ]
      },
      {
        "slug": "claim-check",
        "name": "Claim Check",
        "description": "Claim Check will store messages in a persistent storage and send a claim to another application to access the origin stored message.",
        "helps": "<p>Ballerina supports the persistent storage of messages. Popular storage technologies such as SQL, AWS S3, and Redis are available as Ballerina packages.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/StoreInLibrary.html",
        "tags": [
          "Claim Check",
          "Content Enricher",
          "Content Filter"
        ],
        "category": "Message Transformation",
        "index": 39,
        "icon": "/images/patterns/claim-check.svg",
        "codeFiles": [
          {
            "name": "claim-check-consumer.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\nimport ballerina/io;\nimport ballerinax/kafka;\n\ntype ScanResult [string, string];\n\nfinal http:Client awsS3Client = check new (\"http://bucket.s3.amazonaws.com.balmock,io\");\nfinal http:Client firebaseClient = check new (\"http://api.mriresults.firebase.com.balmock.io\");\nfinal kafka:Consumer kafkaConsumer = check new (kafka:DEFAULT_URL, {\n    groupId: \"mri-scan-group\",\n    topics: [\"topic-mri-scan\"]\n});\n\npublic function main() returns error? {\n    while true {\n        ScanResult[] mriScanResults = check kafkaConsumer->pollPayload(1);\n        foreach var [scanId, patientId] in mriScanResults {\n            http:Response s3Response = check awsS3Client->/mri\\-scans/[scanId].get();\n            string mriScanResult = analyzeMriScan(check s3Response.getByteStream());\n            _ = check firebaseClient->/mri/[scanId]/reports\\.json.put({mriScanResult, patientId}, targetType = json);\n        }\n    }\n}\n\nisolated function analyzeMriScan(stream<byte[], io:Error?> fileByteStream) returns string {\n    // logic to analyze the MRI scan\n    return \"No Abnormalities Detected\";\n}"
          },
          {
            "name": "claim-check-producer.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\nimport ballerina/io;\nimport ballerina/mime;\nimport ballerina/uuid;\nimport ballerinax/kafka;\n\nfinal http:Client awsS3Client = check new (\"http://bucket.s3.amazonaws.com.balmock,io\");\nfinal kafka:Producer kafkaProducer = check new (kafka:DEFAULT_URL);\n\ntype ScanRequest record {|\n    string patientId;\n    stream<byte[], io:Error?> fileByteStream;\n|};\n\nservice /api/v1 on new http:Listener(8080) {\n\n    isolated resource function post scans/mri(http:Request request) returns error? {\n        ScanRequest {patientId, fileByteStream} = check scanRequestFromMultipart(request);\n\n        string claimCheckId = uuid:createType1AsString();\n        string fileName = string `${claimCheckId}.dicom`;\n\n        http:Request s3ObjectCreationRequest = new;\n        s3ObjectCreationRequest.setByteStream(fileByteStream);\n        _ = check awsS3Client->/mri\\-scans/[fileName].put(s3ObjectCreationRequest, targetType = http:Response);\n\n        _ = check kafkaProducer->send({\n            topic: \"topic-mri-scan\",\n            value: [fileName, patientId]\n        });\n    }\n}\n\nisolated function scanRequestFromMultipart(http:Request request) returns ScanRequest|error {\n    mime:Entity[] bodyParts = check request.getBodyParts();\n    string? patientId = ();\n    stream<byte[], io:Error?>? fileByteStream = ();\n    foreach mime:Entity bodyPart in bodyParts {\n        string partName = bodyPart.getContentDisposition().name;\n        if partName == \"patientId\" {\n            patientId = check bodyPart.getText();\n        } else if partName == \"file\" {\n            fileByteStream = check bodyPart.getByteStream();\n        }\n    }\n    if patientId == () || fileByteStream == () {\n        return error(\"Multipart request should contains both patientId and file parts\");\n    }\n    return {fileByteStream, patientId};\n}"
          }
        ]
      },
      {
        "slug": "normalizer",
        "name": "Normalizer",
        "description": "Normalizer routes each message type through a custom message translator so that the resulting messages match a common format.",
        "helps": "<p>Ballerina's type test (<code>is</code> keyword) and match statement can both be used to test the structure of incoming data. Then the data can be transformed into the required format to construct new data structures. Ballerina's data-oriented design helps with complex transformations with features such as destructuring, query expressions, spread operator, etc.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Normalizer.html",
        "tags": [
          "Normalizer",
          "Message Channel",
          "Message Endpoint",
          "Message Translator",
          "Message Router",
          "Message"
        ],
        "category": "Message Transformation",
        "index": 40,
        "icon": "/images/patterns/normalizer.svg",
        "codeFiles": [
          {
            "name": "normalizer.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype ZendeskResponse record {\n    record {|\n        string url;\n        int id;\n        string subject;\n    |} ticket;\n};\n\nfinal http:Client zendeskClient = check new (\"http://api.zendesk.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function post ticket(@http:Payload json|xml request) returns string|error {\n        json normalizedRequest;\n        if request is json {\n            normalizedRequest = normalize(check request.subject, check request.comment);\n        } else {\n            normalizedRequest = normalize((request/<subject>).data(), (request/<comment>).data());\n        }\n        ZendeskResponse zendeskResponse = check zendeskClient->/api/v2/tickets.post(normalizedRequest);\n        return zendeskResponse.ticket.url;\n    }\n}\n\nfunction normalize(string subject, string comment) returns json {\n    return {\n        ticket: {\n            subject,\n            comment: {\n                body: comment\n            }\n        }\n    };\n}"
          }
        ]
      },
      {
        "slug": "canonical-data-model",
        "name": "Canonical Data Model",
        "description": "The Canonical Data Model is a common message format used by different applications for communication.",
        "helps": "<p>Ballerina provides powerful data modelling capabilities through its Type System. You can define data types like JSON and xml, and structures like records to represent your canonical data model. This ensures interoperability when integrating different components in your system, making it easier to exchange data seamlessly.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/CanonicalDataModel.html",
        "tags": [
          "Canonical Data Model",
          "Message Router",
          "Message Translator",
          "Format Indicator"
        ],
        "category": "Message Transformation",
        "index": 41,
        "icon": "/images/patterns/canonical-data-model.svg",
        "codeFiles": [
          {
            "name": "canonical-data-model.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\nconst PROJECT_ID = \"LAND-TEST04\";\nconst DATASET_ID = \"f57074a0-a8b6-403e-9df1-e9fc46\";\n\nfinal http:Client gMapClient = check new (\"http://mapsplatformdatasets.googleapis.com.balmock.io\");\nfinal http:Client microsoftClient = check new (\"http://atlas.microsoft.com.balmock.io\");\n\ntype Gpx xml;\n\ntype Kml xml;\n\ntype Csv record {|\n    float X;\n    float Y;\n    string Name;\n    string Description;\n|}[];\n\ntype GeoJson record {\n    string 'type = \"FeatureCollection\";\n    string name = \"PlaceMarks\";\n    Feature[] features;\n};\n\ntype Feature record {|\n    string 'type = \"Feature\";\n    record {|\n        string X;\n        string Y;\n        string Name;\n        string description;\n    |} properties;\n    record {|\n        string 'type = \"Point\";\n        string[] coordinates;\n    |} geometry;\n|};\n\ntype GMapResponse record {\n    string name;\n    string displayName;\n    string createTime;\n};\n\ntype MicrosoftMapResponse record {\n    string formatVersion;\n    record {\n        record {\n            string latitude;\n            string longitude;\n        }[] points;\n    }[] routes;\n};\n\nservice /map on new http:Listener(8080) {\n    resource function post uploadPlaceMarks(http:Request request) returns GMapResponse|error? {\n        Csv|Gpx data = check getPayload(request);\n        GeoJson geoJson = convertToCanonical(data);\n        Kml kmlData = convertFromCanonicalToKml(geoJson);\n        GMapResponse gMapResponse = check gMapClient->post(\n            string `/v1/projects/${PROJECT_ID}/datasets/${DATASET_ID}:import`, kmlData);\n        return gMapResponse;\n    }\n\n    resource function post getRouteDirection(http:Request request, string query) returns MicrosoftMapResponse|error {\n        Csv|Gpx data = check getPayload(request);\n        GeoJson geoJson = convertToCanonical(data);\n        MicrosoftMapResponse microsoftMapResponse = check microsoftClient->/route/directions/'json.post(\n            {\"supportingPoints\": geoJson.toJson()}, {query: string `${query}`}\n        );\n        return microsoftMapResponse;\n    }\n}\n\nisolated function convertToCanonical(Csv|Gpx data) returns GeoJson {\n    if data is Csv {\n        return convertFromCsvToCanonical(data);\n    } else {\n        return convertFromGpxToCanonical(data);\n    }\n}\n\nisolated function getPayload(http:Request request) returns Csv|Gpx|error {\n    if request.getContentType().includes(\"xml\") {\n        return request.getXmlPayload();\n    }\n    json data = check request.getJsonPayload();\n    return data.cloneWithType(Csv);\n}\n\nisolated function convertFromCsvToCanonical(Csv data) returns GeoJson {\n    return {\n        features: from var member in data\n                  let string X = member.X.toString(), string Y = member.Y.toString()\n                  select {\n                      properties: {X, Y, Name: member.Name, description: member.Description},\n                      geometry: {coordinates: [X, Y]}\n                  }\n    };\n}\n\nisolated function convertFromGpxToCanonical(Gpx gpxData) returns GeoJson {\n    return {\n        features: from var extension in gpxData/**/<extensions>\n            select {\n                properties: {\n                    X: (extension/**/<X>).data(),\n                    Y: (extension/**/<X>).data(),\n                    Name: (extension/**/<Name>).data(),\n                    description: (extension/**/<description>).data()\n                },\n                geometry: {coordinates: [(extension/**/<X>).data(), (extension/**/<Y>).data()]}\n            }\n    };\n}\n\nisolated function convertFromCanonicalToKml(GeoJson geoJson) returns Kml {\n    xml kmlData = xml `<kml>\n        <Document>\n            <Schema id=\"temp\">\n                <SimpleField name=\"X\" type=\"double\"/>\n                <SimpleField name=\"Y\" type=\"double\"/>\n                <SimpleField name=\"Name\" type=\"string\"/>\n            </Schema>\n            ${from Feature feature in geoJson.features\n              select xml `<Placemark>\n                            <description>${feature.properties.description}</description>\n                            <Point>\n                                <coordinates>\n                                    ${feature.geometry.coordinates[0]},${feature.geometry.coordinates[1]}\n                                </coordinates>\n                            </Point>\n                          </Placemark>`}\n            </Document>\n        </kml>`;\n    return kmlData;\n}"
          }
        ]
      }
    ]
  },
  {
    "category": "Messaging Endpoints",
    "items": [
      {
        "slug": "messaging-gateway",
        "name": "Messaging Gateway",
        "description": "Messaging Gateway wraps messaging-specific method calls and exposes domain-specific methods to the application.",
        "helps": "<p>Ballerina's classes and modules help to create wrappers and expose domain-specific functions and methods.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingGateway.html",
        "tags": [
          "Messaging Gateway",
          "Message"
        ],
        "category": "Messaging Endpoints",
        "index": 42,
        "icon": "/images/patterns/messaging-gateway.svg",
        "codeFiles": [
          {
            "name": "messaging-gateway.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\nimport ballerina/io;\n\npublic type ActivateLine readonly & record {|\n    string customerId;\n    string phoneNumber;\n    \"NEW ACTIVATION\"|\"TRANSFER\" activationType;\n    string planCode;\n    string activationDate;\n|};\n\ntype ActivationResponse readonly & record {|\n    string phoneNumber;\n    \"REJECTED\"|\"APPROVED\" status;\n|};\n\ntype ActivationSuccess readonly & record {|\n    string phoneNumber;\n|};\n\ntype ActivationFailureError error;\n\npublic class LineConnectionManager {\n\n    private final http:Client lineClinet;\n\n    public function init() returns error? {\n        self.lineClinet = check new (\"http://api.telcox.com.balmock.io\");\n    }\n\n    public function activateLine(ActivateLine activateLine) returns ActivationSuccess|ActivationFailureError {\n        ActivationResponse|error activationResponse =\n            self.lineClinet->/plans/[activateLine.planCode]/activate.post(activateLine);\n        if activationResponse is error || activationResponse.status == \"REJECTED\" {\n            return error(\"Connection activation failure\", phoneNumber = activateLine.phoneNumber);\n        }\n        return {phoneNumber: activateLine.phoneNumber};\n    }\n}\n\npublic function main() returns error? {\n    ActivateLine activateLine = {\n        customerId: \"USER-USW-0012300912\",\n        phoneNumber: \"555-555-5555\",\n        activationType: \"NEW ACTIVATION\",\n        planCode: \"PLN123\",\n        activationDate: \"2023-09-19\"\n    };\n\n    LineConnectionManager lineConnectionManager = check new;\n    ActivationSuccess|ActivationFailureError activateLineResult = lineConnectionManager.activateLine(activateLine);\n    io:println(activateLineResult);\n}"
          }
        ]
      },
      {
        "slug": "messaging-mapper",
        "name": "Messaging Mapper",
        "description": "The Messaging Mapper maps infrastructure messages to domain objects.",
        "helps": "<p>Ballerina services facilitate the direct mapping of incoming and outgoing domain objects to JSON values. Ballerina's table data structure offers the ability to store domain objects in memory, closely resembling the functionality of SQL-based tables.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingMapper.html",
        "tags": [
          "Messaging Mapper",
          "Message Translator"
        ],
        "category": "Messaging Endpoints",
        "index": 43,
        "icon": "/images/patterns/messaging-mapper.svg",
        "codeFiles": [
          {
            "name": "messaging-mapper.bal",
            "language": "ballerina",
            "content": "import ballerina/graphql;\nimport ballerina/uuid;\n\npublic type Item record {|\n    string code;\n    int quantity;\n    decimal unitPrice;\n|};\n\npublic type PurchasingRequest record {|\n    string customerId;\n    string agentId;\n    Item[] items;\n|};\n\npublic type Invoice record {|\n    *PurchasingRequest;\n    readonly string invoiceId;\n    decimal total;\n|};\n\nfinal table<Invoice> key(invoiceId) invoices = table [];\n\nservice /api/v1 on new graphql:Listener(8080) {\n\n    resource function get invoice(string invoiceId) returns Invoice? {\n        return invoices[invoiceId];\n    }\n\n    remote function createInvoice(PurchasingRequest purchasingRequest) returns Invoice {\n        Invoice invoice = {\n            ...purchasingRequest,\n            invoiceId: uuid:createType1AsString(),\n            total: from var {unitPrice, quantity} in purchasingRequest.items\n                   let var itemTotalPrice = unitPrice * quantity\n                   collect sum(itemTotalPrice)\n        };\n        invoices.add(invoice);\n        return invoice;\n    }\n}"
          }
        ]
      },
      {
        "slug": "polling-consumer",
        "name": "Polling Consumer",
        "description": "Polling consumer consumes messages from a channel when the application is ready to process them.",
        "helps": "<p>Ballerina's concurrency model enables writing simple procedural code that is nevertheless executed in a non-blocking manner. In the below example, <code>sleep</code> does not block the underlying thread. Other Ballerina concurrency constructs, such as <code>wait</code>, behave similarly.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/PollingConsumer.html",
        "tags": [
          "Polling Consumer",
          "Durable Subscriber",
          "Message"
        ],
        "category": "Messaging Endpoints",
        "index": 45,
        "icon": "/images/patterns/polling-consumer.svg",
        "codeFiles": [
          {
            "name": "polling-consumer.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\nimport ballerina/lang.runtime;\n\nenum Status {\n    CREATED,\n    CAPTURED,\n    DENIED,\n    PENDING\n}\n\ntype PaypalResponse record {|\n    string id;\n    Status status;\n    Amount amount;\n    Payee payee;\n|};\n\ntype Amount record {|\n    string value;\n    string currency_code;\n|};\n\ntype Payee record {|\n    string email_address;\n    string merchant_id;\n|};\n\nfinal http:Client paypalClient = check new (\"http://api-m.paypal.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    resource function get payment(string paymentId) returns string|error {\n        foreach int _ in 0 ..< 10 {\n            PaypalResponse response = check paypalClient->/v2/payments/authorizations/[paymentId]();\n            if response.status == CREATED || response.status == PENDING {\n                runtime:sleep(5); // sleep does not block the underlying thread\n            } else {\n                return response.status;\n            }\n        }\n        return error(\"Payment timed out\");\n    }\n}"
          }
        ]
      },
      {
        "slug": "message-dispatcher",
        "name": "Message Dispatcher",
        "description": "Message dispatcher coordinates message processing among multiple performers.",
        "helps": "<p>Ballerina programs can maintain the state internally using variables and perform logic based on the state.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageDispatcher.html",
        "tags": [
          "Message Dispatcher",
          "Competing Consumers",
          "Transactional Client"
        ],
        "category": "Messaging Endpoints",
        "index": 48,
        "icon": "/images/patterns/message-dispatcher.svg",
        "codeFiles": [
          {
            "name": "message-dispatcher.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\nfinal http:Client ocrClient = check new (\"http://api.ocr.com.balmock.io\");\n\ntype OcrResponse record {|\n    string[] lines;\n    int noOfLines;\n    string pdfUrl;\n|};\n\nfinal readonly & string[] ocrProcessors = [\"processor1\", \"processor2\", \"processor3\"];\n\nservice / on new http:Listener(8080) {\n    int processorNo = 0;\n\n    isolated resource function get ocr(string url) returns OcrResponse|error {\n        int currentProcessor;\n        lock {\n            currentProcessor = self.processorNo;\n            self.processorNo = currentProcessor == 2 ? 0 : currentProcessor + 1;\n        }\n        string processorId = ocrProcessors[currentProcessor];\n        return check ocrClient->/[processorId]/parse/imageurl(url = url);\n    }\n}"
          }
        ]
      },
      {
        "slug": "selective-consumer",
        "name": "Selective Consumer",
        "description": "Selective consumer filters the messages which come from a message channel using a criteria.",
        "helps": "<p>Ballerina supports rich set of messaging protocols. Some of these protocols supports channels with filtering capabilities.  Below example uses GraphQL's filtering capabilities to select the data it receives.  If a protocol does not support filtering, user may write their own logic using Ballerina control flow constructs such as <code>if</code>-<code>else</code> and <code>match</code> statements.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageSelector.html",
        "tags": [
          "Selective Consumer",
          "Message Filter",
          "Content Based Router",
          "Message"
        ],
        "category": "Messaging Endpoints",
        "index": 49,
        "icon": "/images/patterns/selective-consumer.svg",
        "codeFiles": [
          {
            "name": "selective-consumer.bal",
            "language": "ballerina",
            "content": "import ballerina/graphql;\nimport ballerina/io;\n\ntype InventoryResponse record {|\n    record {|Inventory[] products;|} data;\n|};\n\ntype Inventory record {|\n    string name;\n    int productsCount;\n|};\n\ntype CsvRecord record {|\n    string name;\n    RequestType requestType;\n|};\n\nenum RequestType {\n    REQUIRED,\n    URGENT\n};\n\nfinal graphql:Client shopify = check new (\"http://blackwellsbooks.myshopify.com.balmock.io\");\n\npublic function main(string category) returns error? {\n    string csvFilePath = \"./resources/orderRequests.csv\";\n    string document = string `{ products(productType: \"${category}\") { name, productsCount } } `;\n    InventoryResponse inventories = check shopify->execute(document);\n    CsvRecord[] csvContent = [];\n    foreach var {name, productsCount} in inventories.data.products {\n        if productsCount < 10 {\n            csvContent.push({name: name, requestType: URGENT});\n        } else if productsCount < 25 {\n            csvContent.push({name: name, requestType: REQUIRED});\n        }\n    }\n    check io:fileWriteCsv(csvFilePath, csvContent);\n}"
          }
        ]
      },
      {
        "slug": "idempotent-receiver",
        "name": "Idempotent Receiver",
        "description": "An idempotent receiver is a receiver that can safely receive the same message multiple times.",
        "helps": "<p>When implementing idempotent endpoints, such as HTTP PUT, users may use Ballerina to create logic that leaves the state in the same state even if the same message is received multiple times. Explicit de-duping can be implemented using Ballerina's rich set of packages to interact with databases and key-value stores, such as SQL and Redis.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/IdempotentReceiver.html",
        "tags": [
          "Idempotent Receiver",
          "Message",
          "Message Channel"
        ],
        "category": "Messaging Endpoints",
        "index": 51,
        "icon": "/images/patterns/idempotent-receiver.svg",
        "codeFiles": [
          {
            "name": "idempotent-receiver.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype OrderDetail record {\n    string orderId;\n    OrderStatus status;\n};\n\nenum OrderStatus {\n    CREATED,\n    SHIPPED,\n    COMPLETED,\n    CANCELLED\n};\n\nfinal map<OrderStatus> orderStatuses = {};\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function put manage\\-orders/[string orderId](OrderDetail orderDetail) returns\n        http:STATUS_NO_CONTENT|http:STATUS_CREATED {\n        OrderStatus? orderStatus = orderStatuses[orderId];\n        if orderStatus == orderDetail.status {\n            return http:STATUS_NO_CONTENT;\n        } else {\n            orderStatuses[orderId] = orderDetail.status;\n            return http:STATUS_CREATED;\n        }\n    }\n}"
          }
        ]
      },
      {
        "slug": "service-activator",
        "name": "Service Activator",
        "description": "Service activator provides a service that can be invoked via both messaging and non-messaging techniques.",
        "helps": "<p>Ballerina can expose public functions/classes that can be invoked by other Ballerina programs. This allows sharing common logic between services and applications. Such Ballerina packages can be published using Ballerina Central.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingAdapter.html",
        "tags": [
          "Service Activator",
          "Request-Reply",
          "Command Message"
        ],
        "category": "Messaging Endpoints",
        "index": 52,
        "icon": "/images/patterns/service-activator.svg",
        "codeFiles": [
          {
            "name": "service-activator.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype Customer record {|\n    string customerId;\n    string customerName;\n    decimal totalEligibleClaimAmount;\n|};\n\ntype ClaimRequest record {|\n    string customerId;\n    string policyNumber;\n    decimal claimAmount;\n    string accidentType;\n    string claimLocation;\n    ClaimDate claimDate;\n|};\n\ntype ClaimDate record {|\n    string year;\n    string month;\n    string day;\n|};\n\ntype Claim record {|\n    *ClaimRequest;\n    \"APPROVED\"|\"REJECTED\"|\"PENDING\" status;\n|};\n\ntype ClaimHistory record {|\n    string customerId;\n    Claim[] claims;\n|};\n\nfinal http:Client claimHistory = check new (\"http://api.claimhistory.firebase.com.balmock.io\");\nfinal http:Client customerDetails = check new (\"http://api.customerdetails.firebase.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    isolated resource function post claim(ClaimRequest claimRequest) returns decimal|error {\n        ClaimHistory claimHostory = check claimHistory->/claims/[claimRequest.customerId]/claims\\.json();\n        Customer customer = check customerDetails->/customers/[claimRequest.customerId]/details\\.json();\n        return calculateClaimAmount(claimRequest, claimHostory, customer.totalEligibleClaimAmount);\n    }\n}\n\nisolated function calculateClaimAmount(ClaimRequest claimRequest, ClaimHistory claimHistory, decimal totalElegibleAmount) returns decimal {\n    decimal totalClaimedAmount = from var {claimAmount, claimDate, status} in claimHistory.claims\n        where claimDate.year == claimRequest.claimDate.year && status == \"APPROVED\"\n        collect sum(claimAmount);\n    decimal remainingAmount = totalElegibleAmount - totalClaimedAmount;\n    return decimal:max(remainingAmount, claimRequest.claimAmount * 0.2);\n}"
          }
        ]
      }
    ]
  },
  {
    "category": "System Management",
    "items": [
      {
        "slug": "wire-tap",
        "name": "Wire Tap",
        "description": "Wire tap publishes each incoming message unmodified to a secondary channel for inspection and analysis.",
        "helps": "<p>Ballerina has a lightweight concurrency model with built-in syntax support. This helps to send messages to a secondary channel parallelly without blocking the main channel.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/WireTap.html",
        "tags": [
          "Wire Tap",
          "Message Channel",
          "Message Endpoint"
        ],
        "category": "System Management",
        "index": 55,
        "icon": "/images/patterns/wire-tap.svg",
        "codeFiles": [
          {
            "name": "wire-tap.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype SnowflakeRequest record {\n    string statement;\n    string timeout = \"60\";\n    string database = \"messageLog\";\n    string schema = \"message\";\n    string role = \"logger\";\n};\n\ntype StockResponse record {\n    string ParentHandlingUnitUUID;\n    string StockItemUUID;\n    string EWMWarehouse;\n    string HandlingUnitNumber;\n    string ShelfLifeExpirationDate;\n    string CountryOfOrigin;\n};\n\ntype LogLevel \"INFO\"|\"WARNING\"|\"ERROR\";\n\nfinal http:Client sapClient = check new (\"http://api.sap.com.balmock.io\");\nfinal http:Client db = check new (\"http://api.snowflake.com.balmock.io\");\n\nservice /warehouse on new http:Listener(8080) {\n\n    resource function get stock(string parentId, string productId) returns StockResponse|error {\n        StockResponse result = check sapClient->/WarehousePhysicalStockProducts/[parentId]/[productId];\n        worker w returns error? {\n            check wiretap(\"stock\", \"INFO\", result.toString());\n        }\n        return result;\n    }\n}\n\nfunction wiretap(string tableName, LogLevel severity, string message) returns error? {\n    SnowflakeRequest snowflakeRequest = {statement: string `insert into ${tableName} values (${message}, ${severity}))`};\n    json _ = check db->/statements.post(snowflakeRequest);\n}"
          }
        ]
      },
      {
        "slug": "message-history",
        "name": "Message History",
        "description": "Message History maintains a list of all components that the message passed through. Every component that processes the message adds one entry to the list.",
        "helps": "<p>Depending on the protocol, Ballerina provides APIs to manipulate message content, including headers.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageHistory.html",
        "tags": [
          "Message History",
          "Message Store",
          "Message Router"
        ],
        "category": "System Management",
        "index": 56,
        "icon": "/images/patterns/message-history.svg",
        "codeFiles": [
          {
            "name": "message-history.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype ReimbursementRequest record {|\n    string employee_id;\n    string reason;\n    string amount;\n|};\n\ntype TraceId record {|\n    string id;\n|};\n\nfinal http:Client internalClient = check new (\"http://api.internal.balmock.io\");\nfinal http:Client logClient = check new (\"http://api.internal-log.balmock.io\");\nconst HISTORY_HEADER = \"x-message-history\";\n\nservice /finance on new http:Listener(8080) {\n    resource function post reimburse(ReimbursementRequest request) returns http:Response|error {\n        http:Response response = check internalClient->post(\"/reimbursements\", request);\n        http:Response outbound = new;\n        outbound.setPayload(check response.getJsonPayload());\n        outbound.statusCode = response.statusCode;\n\n        string traceId = check logAndGetTraceId(request);\n        if response.hasHeader(HISTORY_HEADER) {\n            string existingHeader = check response.getHeader(HISTORY_HEADER);\n            outbound.setHeader(HISTORY_HEADER, existingHeader + \";\" + traceId);\n        } else {\n            outbound.setHeader(HISTORY_HEADER, traceId);\n        }\n        return outbound;\n    }\n}\n\nfunction logAndGetTraceId(anydata message) returns string|error {\n    TraceId traceId = check logClient->post(\"/log_message\", message);\n    return traceId.id;\n}"
          }
        ]
      },
      {
        "slug": "message-store",
        "name": "Message Store",
        "description": "Message store captures information about each message in a central location.",
        "helps": "<p>Ballerina can send messages to multiple channels during a single service invocation. Ballerina's concurrency model helps to send messages asynchronously without blocking the main channel. The wildcard binding pattern is used to indicate a 'fire-and-forget' invocation, where the response is not used.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageStore.html",
        "tags": [
          "Message Store",
          "Message Channel",
          "Wire Tap",
          "Message Endpoint",
          "Message"
        ],
        "category": "System Management",
        "index": 57,
        "icon": "/images/patterns/message-store.svg",
        "codeFiles": [
          {
            "name": "message-store.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\n\ntype GeoCodeResponse record {|\n    json results;\n|};\n\nfinal http:Client geoCodingClient = check new (\"http://api.maps.googleapis.com.balmock.io\");\nfinal http:Client firebaseClient = check new (\"http://api.mapsproject.firebase.com.balmock.io\");\n\nservice /api on new http:Listener(8080) {\n\n    resource function get location(string address) returns GeoCodeResponse|error {\n        GeoCodeResponse|error storedGeocode = firebaseClient->/location/[address]/location\\.json();\n        if storedGeocode !is error {\n            return storedGeocode;\n        }\n        GeoCodeResponse geocode = check geoCodingClient->/maps/api/geocode/'json(place = address);\n        var _ = start storeAddress(address, geocode);\n        return geocode;\n    }\n}\n\nfunction storeAddress(string address, GeoCodeResponse geocode) returns error? {\n    _ = check firebaseClient->/location/[address]/location\\.json.put(geocode, targetType = json);\n}"
          }
        ]
      },
      {
        "slug": "test-message",
        "name": "Test Message",
        "description": "Assure the health of messaging components by sending test messages. Note: Instead of the original pattern, we have selected a modern version where infrastructure polls for the health of the components.",
        "helps": "<p>Ballerina provides built-in support for creating, propagating(<code>check</code> keyword), and handling errors. Error handling logic can be performed after testing if a given value is an error using the <code>is</code> keyword.</p>\n",
        "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/TestMessage.html",
        "tags": [
          "Test Message",
          "Message Filter",
          "Message"
        ],
        "category": "System Management",
        "index": 59,
        "icon": "/images/patterns/test-message.svg",
        "codeFiles": [
          {
            "name": "test-message.bal",
            "language": "ballerina",
            "content": "import ballerina/http;\nimport ballerina/sql;\nimport ballerinax/mysql;\nimport ballerinax/mysql.driver as _;\n\nservice /customer on new http:Listener(8080) {\n    private mysql:Client? db = null;\n    boolean dbConnected = false;\n\n    function init() {\n        mysql:Client|error dbClient = new (\"localhost\", \"admin\", \"adminpass\", \"CUSTOMER\", 3000);\n        if dbClient is mysql:Client {\n            self.db = dbClient;\n            self.dbConnected = true;\n        }\n    }\n\n    resource function get phoneNumber(string id) returns string|http:InternalServerError|http:NotFound|error {\n        mysql:Client? db = self.db;\n        if db !is mysql:Client {\n            return http:INTERNAL_SERVER_ERROR;\n        }\n\n        string|error result = db->queryRow(`SELECT number FROM customers WHERE id = ${id}`);\n        if result is sql:NoRowsError {\n            return http:NOT_FOUND;\n        }\n        return result;\n    }\n\n    resource function get heartbeat() returns http:Ok|http:InternalServerError {\n        return self.dbConnected ? http:OK : http:INTERNAL_SERVER_ERROR;\n    }\n}"
          }
        ]
      }
    ]
  }
] as const;

export const enterpriseIntegrationPatternMap: Record<string, EnterpriseIntegrationPattern> = {
  "command-message": {
    "slug": "command-message",
    "name": "Command Message",
    "description": "Command message invokes a remote procedure via messages to receive a response.",
    "helps": "<p>Ballerina supports a rich set of network protocol connectors which you can use to invoke remote applications.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/CommandMessage.html",
    "tags": [
      "Command Message",
      "Messaging",
      "Point-to-Point Channel"
    ],
    "category": "Message Construction",
    "index": 15,
    "icon": "/images/patterns/command-message.svg",
    "codeFiles": [
      {
        "name": "command-message.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype UserGroupCreateRequest record {|\n    string name;\n    string description;\n    string team_id;\n|};\n\ntype UserGroup record {\n    *UserGroupCreateRequest;\n    string id;\n    boolean is_usergroup;\n    string 'handle;\n    boolean is_external;\n    int date_create;\n    string created_by;\n    string user_count;\n};\n\ntype UserGroupCreationResponse record {\n    boolean ok;\n    UserGroup usergroup?;\n    string 'error?;\n};\n\nfinal http:Client slackClient = check new (\"http://api.slack.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    isolated resource function post createUserGroup(UserGroupCreateRequest userGroup)\n    returns UserGroupCreationResponse|error {\n        return slackClient->/api/usergroups\\.create.post(userGroup, mediaType = \"x-www-form-urlencoded\");\n    }\n}"
      }
    ]
  },
  "document-message": {
    "slug": "document-message",
    "name": "Document Message",
    "description": "The document message transfers data from one application to another. The focus is on the data and reliability, not on the timing of the transfer.",
    "helps": "<p>Ballerina supports sending and receiving data in multiple formats such as JSON and XML over different protocols such as HTTP, GRPC, Kafka, etc. Depending on the protocol, Ballerina provides different reliability mechanisms. As an example, the Ballerina HTTP client supports retries, load balancing, and circuit breaking.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/DocumentMessage.html",
    "tags": [
      "Document Message",
      "Message Channel",
      "Message Endpoint",
      "Point-to-Point Channel",
      "Request-Reply"
    ],
    "category": "Message Construction",
    "index": 16,
    "icon": "/images/patterns/document-message.svg",
    "codeFiles": [
      {
        "name": "document-message.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerina/mime;\n\ntype CsvRequest record {|\n    string org;\n    string filename;\n|};\n\ntype ZohoResponse record {|\n    string status;\n    string code;\n    string message;\n    record {|\n        string file_id;\n        string created_time;\n    |} details;\n|};\n\nfinal http:Client zohoClient = check new (\"http://content.zohoapis.com.balmock.io\",\n    // Retry 3 times with 1 second interval for error codes 404, 408, and 500.\n    retryConfig = {count: 3, interval: 1, statusCodes: [404, 408, 500]}\n);\n\nservice /crm on new http:Listener(8080) {\n    resource function post bulkUploadLeads(CsvRequest csvRequest) returns ZohoResponse|error {\n        http:Request request = new;\n        request.addHeader(\"X-CRM_ORG\", csvRequest.org);\n        request.addHeader(\"feature\", \"bulk-write\");\n        request.setFileAsPayload(\"./ftpincoming/\" + csvRequest.filename, contentType = mime:MULTIPART_FORM_DATA);\n        return zohoClient->/crm/v5/upload.post(request);\n    }\n}"
      }
    ]
  },
  "event-message": {
    "slug": "event-message",
    "name": "Event Message",
    "description": "Event message notifies other applications about something that happened. Unlike document message, the focus is on the timing of the message rather than the content.",
    "helps": "<p>Ballerina packages such as HTTP, Kafka, Websocket, etc., in the Ballerina library provide listeners, through which you can consume events from other applications. Each such package provides protocol-specific message sending APIs as well.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/EventMessage.html",
    "tags": [
      "Event Message",
      "Command Message",
      "Point-to-Point Channel"
    ],
    "category": "Message Construction",
    "index": 17,
    "icon": "/images/patterns/event-message.svg",
    "codeFiles": [
      {
        "name": "event-message.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerina/mime;\nimport ballerina/url;\n\ntype IncidentRequest record {\n    string phoneNo;\n    Incident incident;\n};\n\ntype Incident record {|\n    string description;\n    string date;\n    string time;\n|};\n\nconst FROM_NO = \"+15005550006\";\nconst API_VERSION = \"2010-04-01\";\nconst TWILIO_SID = \"VBC1849a56d52g41s4b2b2cc004c0027aa8\";\n\nfinal http:Client twilio = check new (\"http://api.twilio.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    resource function post incidents(IncidentRequest req) returns error? {\n        string body = string `Incident ${req.incident.description} reported: \n                              ${req.incident.date} at ${req.incident.time}.`;\n        http:Request twilioReq = new;\n        string payload = \"From=\" + check url:encode(FROM_NO, \"utf-8\") +\n                         \"&To=\" + check url:encode(req.phoneNo, \"utf-8\") +\n                         \"&Body=\" + check url:encode(body, \"utf-8\");\n        twilioReq.setTextPayload(payload, contentType = mime:APPLICATION_FORM_URLENCODED);\n        _ = check twilio->/[API_VERSION]/Accounts/[TWILIO_SID]/Messages\\.json.post(twilioReq,\n            targetType = http:Response\n        );\n    }\n}"
      }
    ]
  },
  "correlation-identifier": {
    "slug": "correlation-identifier",
    "name": "Correlation Identifier",
    "description": "A correlation Identifier is a unique identifier that indicates which request message this reply is for.",
    "helps": "<p>Ballerina can send and receive messages over multiple protocols. Ballerina supports extracting and injecting information into the messages. The extracted information can be stored for later use as a correlation identifier. Module-level variables can be used for temporary storage. For a more robust solution, Ballerina provides a rich set of packages to interact with databases and key-value stores, such as SQL and Redis.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/CorrelationIdentifier.html",
    "tags": [
      "Correlation Identifier",
      "Request Reply",
      "Selective Consumer",
      "Messsage"
    ],
    "category": "Message Construction",
    "index": 20,
    "icon": "/images/patterns/correlation-identifier.svg",
    "codeFiles": [
      {
        "name": "correlation-identifier.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerinax/kafka;\n\ntype OrderRequest record {|\n    string orderId;\n    string name;\n    string address;\n    string phoneNumber;\n    OrderItem[] items;\n|};\n\ntype OrderItem record {|\n    string itemCode;\n    int quantity;\n    float unitPrice;\n|};\n\ntype InvoiceDetails record {|\n    string orderId;\n    string invoiceId;\n|};\n\nconst INVOICE_GENERATING = \"INVOICE_GENERATING\";\nconst INVOICE_GENERATED = \"INVOICE_GENERATED\";\n\ntype InvoiceGenerating record {|\n    INVOICE_GENERATING status = INVOICE_GENERATING;\n|};\n\ntype InvoiceGenerated record {|\n    INVOICE_GENERATED status = INVOICE_GENERATED;\n    string invoiceId;\n|};\n\nfinal map<InvoiceGenerating|InvoiceGenerated> processedOrders = {};\n\nservice /api/v1 on new http:Listener(8080) {\n\n    private final kafka:Producer kafkaPublisher;\n\n    function init() returns error? {\n        self.kafkaPublisher = check new (kafka:DEFAULT_URL);\n    }\n\n    resource function post process/'order(OrderRequest orderRequest) returns error? {\n        check self.kafkaPublisher->send({\n            topic: \"order-events\",\n            value: orderRequest\n        });\n        processedOrders[orderRequest.orderId] = {\n            \"status\": INVOICE_GENERATING\n        };\n    }\n}\n\nlistener kafka:Listener orderListener = new (kafka:DEFAULT_URL, {\n    groupId: \"order-group-id\",\n    topics: \"invoice-events\"\n});\n\nservice on orderListener {\n    remote function onConsumerRecord(InvoiceDetails[] invoices) returns error? {\n        foreach var invoice in invoices {\n            processedOrders[invoice.orderId] = {\n                \"status\": INVOICE_GENERATED,\n                \"invoiceId\": invoice.invoiceId\n            };\n        }\n    }\n}"
      }
    ]
  },
  "message-sequence": {
    "slug": "message-sequence",
    "name": "Message Sequence",
    "description": "Message sequence sends the data as a sequence of messages and marks each message with sequence identification fields.",
    "helps": "<p>Ballerina supports loop constructs such as <code>while</code>, <code>foreach</code>, and <code>map</code>. These constructs can be used to iterate over data and send it in chunks. Program state can be kept in variables.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageSequence.html",
    "tags": [
      "Message Sequence",
      "Message Channel",
      "Message Endpoint",
      "Message"
    ],
    "category": "Message Construction",
    "index": 21,
    "icon": "/images/patterns/message-sequence.svg",
    "codeFiles": [
      {
        "name": "message-sequence.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerina/io;\n\nfinal http:Client s3Client = check new (\"http://noname-tech.s3.amazonaws.com.balmock.io\");\n\npublic function main() returns error? {\n    http:Response metaData = check s3Client->/employee_names.head();\n    int fileSize = check int:fromString(check metaData.getHeader(\"Content-Length\"));\n\n    check io:fileWriteBytes(\"./resources/employee_names.txt\", []);\n\n    int numberOfChunks = (fileSize + 10 - 1) / 10;\n    // Download the data chunk by chunk.\n    foreach int i in 0 ..< numberOfChunks {\n        map<string> headers = {Range: string `bytes=${10 * i}-${10 * (i + 1) - 1}`};\n        http:Response s3Response = check s3Client->/employee_names.get(headers = headers);\n        byte[] chunkData = check s3Response.getBinaryPayload();\n        check io:fileWriteBytes(\"./resources/employee_names.txt\", chunkData, io:APPEND);\n    }\n}"
      }
    ]
  },
  "format-indicator": {
    "slug": "format-indicator",
    "name": "Format Indicator",
    "description": "The Format Indicator will identify the message format based on the version or structure and process it.",
    "helps": "<p>The <code>is</code> keyword in Ballerina distinguishes between structured types, aiding in distinguishing various message versions.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/FormatIndicator.html",
    "tags": [
      "Format Indicator",
      "Cannonical Data Model"
    ],
    "category": "Message Construction",
    "index": 23,
    "icon": "/images/patterns/format-indicator.svg",
    "codeFiles": [
      {
        "name": "format-indicator.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\npublic type PatientReqV1 record {|\n    \"1.0\" version = \"1.0\";\n    string firstName;\n    string lastName;\n    string dob;\n    string diagnosis;\n|};\n\npublic type PatientReqV2 record {|\n    \"2.0\" version = \"2.0\";\n    Patient patient;\n|};\n\ntype PatientReq PatientReqV1|PatientReqV2;\n\npublic type Patient record {|\n    string fullName;\n    string dob;\n    string diagnosis;\n|};\n\nfinal http:Client patientClient = check new (\"http://api.patients.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function post data/patient(PatientReq patintReq) returns error? {\n        Patient patient;\n        if patintReq is PatientReqV1 {\n            patient = {\n                dob: patintReq.dob,\n                fullName: patintReq.firstName + \" \" + patintReq.lastName,\n                diagnosis: patintReq.diagnosis\n            };\n        } else {\n            patient = {\n                dob: patintReq.patient.dob,\n                fullName: patintReq.patient.fullName,\n                diagnosis: patintReq.patient.diagnosis\n            };\n        }\n        _ = check patientClient->/patient.post(patient, targetType = http:Response);\n    }\n\n    resource function post patient(Patient patient) returns error? {\n        _ = check patientClient->/patient.post(patient, targetType = http:Response);\n    }\n}"
      }
    ]
  },
  "content-based-router": {
    "slug": "content-based-router",
    "name": "Content-Based Router",
    "description": "Content-based router routes each message to the correct recipient based on message content.",
    "helps": "<p>Ballerina supports conditional logic with if-else and match statements. This can be used to route messages based on message content, header, or any custom logic. Ballerina type system supports union types (e.g., <code>Country</code> enum below is a union), which helps to define choices in a type-safe and readable manner.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/ContentBasedRouter.html",
    "tags": [
      "Content Based Router",
      "Message Filter",
      "Dynamtic Router"
    ],
    "category": "Message Routing",
    "index": 24,
    "icon": "/images/patterns/content-based-router.svg",
    "codeFiles": [
      {
        "name": "content-based-router.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype DhlUkResponse record {|\n    string url;\n    record {|\n        string id;\n        Status status;\n    |}[] shipments;\n|};\n\ntype DhlDpiResponse record {|\n    Status[] events;\n    string publicUrl;\n    string barcode;\n|};\n\ntype Status record {|\n    string statusCode;\n    string status;\n|};\n\nenum Country {\n    UK,\n    DE\n}\n\ntype TrackingRequest record {|\n    Country country;\n    string tracking_id;\n|};\n\nfinal http:Client dhl = check new (\"http://api.dhl.com.balmock.io\");\n\nservice /shipments on new http:Listener(8080) {\n\n    resource function post status(TrackingRequest request) returns string|error {\n        match request.country {\n            UK => {\n                DhlUkResponse response = check dhl->/parceluk/tracking/v1/shipments(trackingNumber = request.tracking_id);\n                return response.shipments[0].status.status;\n            }\n            DE => {\n                DhlDpiResponse response = check dhl->/dpi/tracking/v1/trackings/[request.tracking_id];\n                return response.events[0].status;\n            }\n            _ => {\n                return error(\"County not supported\");\n            }\n        }\n    }\n}"
      }
    ]
  },
  "message-filter": {
    "slug": "message-filter",
    "name": "Message Filter",
    "description": "Message filter neglects the uninterested messages based on criteria and publishes the filtered message to another channel.",
    "helps": "<p>Ballerina enables filtering messages using basic control structures such as if and switch statements.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Filter.html",
    "tags": [
      "Message Filter",
      "Message Channel",
      "Message Endpoint"
    ],
    "category": "Message Routing",
    "index": 25,
    "icon": "/images/patterns/message-filter.svg",
    "codeFiles": [
      {
        "name": "message-filter.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype Ticket record {|\n    string id;\n    string url;\n    string subject;\n    HIGH_PRIORITY|MEDUIM_PRIORITY|LOW_PRIORITY priority;\n|};\n\nconst HIGH_PRIORITY = 1;\nconst MEDUIM_PRIORITY = 2;\nconst LOW_PRIORITY = 3;\n\nfinal http:Client notificationChannel = check new (\"http://api.notification.channel.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function post ticket(Ticket ticket) returns error? {\n        if ticket.priority == 1 {\n            _ = check notificationChannel->/email/notify.post(ticket, targetType = http:Response);\n        }\n    }\n}"
      }
    ]
  },
  "recipient-list": {
    "slug": "recipient-list",
    "name": "Recipient List",
    "description": "The recipient list pattern inspects an incoming message, determines the list of desired recipients, and forwards the message to all channels associated with the recipients in the list.",
    "helps": "<p>Ballerina can extract information from messages and execute logic based on that. Iteration constructs such as <code>foreach</code> and <code>while</code> and query expressions can be used to execute a given logic for each recipient. Ballerina supports sending multiple messages in a single incoming message.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/RecipientList.html",
    "tags": [
      "Recipient List",
      "Content Based Router",
      "Message Router"
    ],
    "category": "Message Routing",
    "index": 27,
    "icon": "/images/patterns/recipient-list.svg",
    "codeFiles": [
      {
        "name": "recipient-list.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype Recipient readonly & record {|\n    string recpientId;\n    string catergory;\n    string contact;\n    \"EMAIL\"|\"SMS\"|\"NOTIFICATION\" subscription;\n|};\n\ntype Message readonly & record {|\n    string subject?;\n    string body;\n    string signature?;\n|};\n\nfinal map<Recipient[]> recipientList = {};\n\nfinal http:Client emailManagerClient = check new (\"http://api.email.manager.com.balmock.io\");\nfinal http:Client smsManagerClient = check new (\"http://api.sms.manager.com.balmock.io\");\nfinal http:Client notificationManagerClient = check new (\"http://api.notification.manager.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function post quotes/[string catergory](Message message) returns error? {\n        foreach var {contact, subscription} in recipientList.get(catergory) {\n            match subscription {\n                \"EMAIL\" => {\n                    _ = check emailManagerClient->/send/[contact].post(message, targetType = http:Response);\n                }\n                \"SMS\" => {\n                    _ = check smsManagerClient->/send/[contact].post(message, targetType = http:Response);\n                }\n                \"NOTIFICATION\" => {\n                    _ = check notificationManagerClient->/send/[contact].post(message, targetType = http:Response);\n                }\n            }\n        }\n    }\n}"
      }
    ]
  },
  "splitter": {
    "slug": "splitter",
    "name": "Splitter",
    "description": "Splitter splits the message into multiple messages, each containing one of the elements.",
    "helps": "<p>Ballerina supports arrays and maps as first-class data structures. These structures can be iterated over using <code>foreach</code> and query expressions.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Sequencer.html",
    "tags": [
      "Splitter",
      "Content Filter",
      "Event Message"
    ],
    "category": "Message Routing",
    "index": 28,
    "icon": "/images/patterns/splitter.svg",
    "codeFiles": [
      {
        "name": "splitter.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerina/mime;\nimport ballerina/url;\n\ntype ReminderRequest record {\n    string date;\n    Event[] events;\n};\n\ntype Event record {|\n    string eventName;\n    Attendee[] attendees;\n|};\n\ntype Attendee record {|\n    string name;\n    string number;\n|};\n\nconst FROM_NO = \"+15005550006\";\nconst TWILIO_SID = \"VAC1829a53d52f41b4b2b1cc003c0026aa8\";\nconst API_VERSION = \"2010-04-01\";\n\nfinal http:Client twilio = check new (\"http://api.twilio.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    resource function post reminders(ReminderRequest request) returns error? {\n        foreach var event in request.events {\n            foreach var attendee in event.attendees {\n                check sendReminder(attendee, event.eventName, request.date);\n            }\n        }\n    }\n}\n\nfunction sendReminder(Attendee attendee, string eventName, string date) returns error? {\n    string body = string `Hi ${attendee.name}, looking forward to meet you at the ${eventName} on ${date}`;\n    string payload = \"From=\" + check url:encode(FROM_NO, \"utf-8\") +\n                     \"&To=\" + check url:encode(attendee.number, \"utf-8\") +\n                     \"&Body=\" + check url:encode(body, \"utf-8\");\n    http:Request twilioReq = new;\n    twilioReq.setTextPayload(payload, contentType = mime:APPLICATION_FORM_URLENCODED);\n    _ = check twilio->/[API_VERSION]/Accounts/[TWILIO_SID]/Messages\\.json.post(twilioReq, targetType = http:Response);\n}"
      }
    ]
  },
  "aggregator": {
    "slug": "aggregator",
    "name": "Aggregator",
    "description": "Aggregator patiently collects a sequence of messages and combines them once all have been received.",
    "helps": "<p>Ballerina provides convenient map and table data structures for temporary message storage. Ballerina provides robust support for distributed storage with the Redis package. Additionally, it offers seamless integration with various SQL and NoSQL databases for persistent data storage. Ballerina's cache package is an efficient in-memory cache solution that includes automatic cleanup mechanisms.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Aggregator.html",
    "tags": [
      "Aggregator"
    ],
    "category": "Message Routing",
    "index": 29,
    "icon": "/images/patterns/aggregator.svg",
    "codeFiles": [
      {
        "name": "aggregator.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\nfinal map<json[]> partialSurveys = {};\n\nfinal http:Client formSubmitClient = check new (\"http://api.surveyme.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function post survey/[string id](@http:Header string userId, @http:Payload json formData) returns error? {\n        json[]? surveyData = partialSurveys[userId];\n        if surveyData == () {\n            json[] newSurvey = [formData];\n            partialSurveys[userId] = newSurvey;\n        } else {\n            surveyData.push(formData);\n            if surveyData.length() == 3 {\n                _ = check formSubmitClient->/survey/[id]/submit.post({userId: surveyData}, targetType = http:Response);\n                _ = partialSurveys.remove(userId);\n            }\n        }\n    }\n}"
      }
    ]
  },
  "resequencer": {
    "slug": "resequencer",
    "name": "Resequencer",
    "description": "Resequencer reorders the sequence of messages received in the incorrect order.",
    "helps": "<p>Ballerina provides convenient map and table data structures for temporary message storage. The query expressions enable sorting arrays based on one or more item attributes.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Resequencer.html",
    "tags": [
      "Resequencer"
    ],
    "category": "Message Routing",
    "index": 30,
    "icon": "/images/patterns/resequencer.svg",
    "codeFiles": [
      {
        "name": "resequencer.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype Approval record {\n    TEAM_LEAD|MANAGER|SENIOR_MANAGER leadLevel;\n    int score;\n    int nextPromotionLevel;\n};\n\nconst TEAM_LEAD = 1;\nconst MANAGER = 2;\nconst SENIOR_MANAGER = 3;\n\nfinal map<Approval[]> incompleteApprovals = {};\n\nfinal http:Client hrClient = check new (\"http://api.wso2hr.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function post employees/[string emoloyeeId]/approval(Approval approvalReq) returns error? {\n        Approval[]? approvals = incompleteApprovals[emoloyeeId];\n        if approvals == () {\n            incompleteApprovals[emoloyeeId] = [approvalReq];\n            return;\n        }\n        approvals.push(approvalReq);\n        if approvals.length() < 3 {\n            return;\n        }\n        from Approval approval in approvals\n        order by approval.leadLevel\n        do {\n            _ = check hrClient->/promotions/employees/[emoloyeeId]/approval.post(approval, targetType = json);\n        };\n        _ = incompleteApprovals.remove(emoloyeeId);\n    }\n}"
      }
    ]
  },
  "composed-message-processor": {
    "slug": "composed-message-processor",
    "name": "Composed Message Processor",
    "description": "Composed Message Processor splits the message up, routes the sub-messages to the appropriate destinations and re-aggregates the responses back into a single message.",
    "helps": "<p>Ballerina has <code>foreach</code>, <code>while</code> and query expressions to iterate over data. During iteration, Ballerina can send and receive messages. Ballerina can extract, manipulate and store data in messages using variables.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/DistributionAggregate.html",
    "tags": [
      "Composed Message Processor",
      "Aggregator",
      "Content Based Router"
    ],
    "category": "Message Routing",
    "index": 31,
    "icon": "/images/patterns/composed-message-processor.svg",
    "codeFiles": [
      {
        "name": "composed-message-processor.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype SalesByStateRequest record {|\n    string[] states;\n|};\n\ntype SalesByState record {|\n    decimal revenue;\n    decimal operatingExpenses;\n    int production;\n    int totalEmployees;\n|};\n\ntype AggregratedSales record {|\n    map<decimal> revenueByState = {};\n    decimal totalRevenue = 0.0;\n    decimal maxRevenue = 0.0;\n    string maxRevenueState = \"\";\n    map<decimal> operatingExpensesByState = {};\n    decimal totalOperatingExpenses = 0.0;\n    int totalProduction = 0;\n    map<int> productivityByState = {};\n|};\n\nfinal map<http:Client> stateRoutes = {\n    Texas: check new (\"http://api.texas.office.com.balmock.io\"),\n    Ohio: check new (\"http://api.ohio.office.com.balmock.io\"),\n    Florida: check new (\"http://api.florida.office.com.balmock.io\")\n};\n\nservice /api/v1 on new http:Listener(8080) {\n    resource function post dashboard(SalesByStateRequest salesRequest) returns AggregratedSales|error {\n        AggregratedSales summary = {};\n        foreach string state in salesRequest.states {\n            http:Client? stateClient = stateRoutes[state];\n            if stateClient == () {\n                return error(\"Invalid state provided\");\n            }\n            SalesByState salesByState = check stateClient->/sales();\n            aggregateSales(summary, state, salesByState);\n        }\n        return summary;\n    }\n}\n\nfunction aggregateSales(AggregratedSales summary, string state, SalesByState salesByState) {\n    summary.revenueByState[state] = salesByState.revenue;\n    summary.totalRevenue += salesByState.revenue;\n    summary.operatingExpensesByState[state] = salesByState.operatingExpenses;\n    summary.totalOperatingExpenses += salesByState.operatingExpenses;\n    summary.totalProduction += salesByState.production;\n    summary.maxRevenueState = summary.maxRevenue < salesByState.revenue ? state : summary.maxRevenueState;\n    summary.maxRevenue = summary.maxRevenue < salesByState.revenue ? salesByState.revenue : summary.maxRevenue;\n    summary.productivityByState[state] = salesByState.production / salesByState.totalEmployees;\n}"
      }
    ]
  },
  "scatter-gather": {
    "slug": "scatter-gather",
    "name": "Scatter-Gather",
    "description": "Scatter-gather broadcasts a message to multiple recipients and re-aggregates the responses back into a single message.",
    "helps": "<p>Ballerina has a lightweight <a href=\"/learn/by-example/named-workers/\">concurrency</a> model with built-in syntax support. This helps to send messages parallelly and to wait on aggregation. Query expressions are convenient for transforming, ordering, and filtering the aggregated data.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/BroadcastAggregate.html",
    "tags": [
      "Scatter-Gather",
      "Aggregator",
      "Message Channel",
      "Message Endpoint",
      "Message Router",
      "Message"
    ],
    "category": "Message Routing",
    "index": 32,
    "icon": "/images/patterns/scatter-gather.svg",
    "codeFiles": [
      {
        "name": "scatter-gather.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype CarRental record {|\n    string carType;\n    string price;\n    string resultLink;\n    string vendor;\n|};\n\ntype AvisResponse record {\n    record {\n        *CarRental;\n    }[] result;\n};\n\nfinal http:Client hotwireEP = check new (\"http://api.hotwire.com.balmock.io\");\nfinal http:Client avisEP = check new (\"http://api.avis.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function get vehicles(string dropOffDateTime, string dropOffLocation, string pickupDateTime,\n            string pickupLocation) returns map<CarRental[]>|error {\n\n        worker hotwire returns CarRental[]|error {\n            http:Response hotwireResponse = check hotwireEP->/v1/search/car.get(pickup = pickupLocation,\n                dest = dropOffLocation, startDate = pickupDateTime, endDate = dropOffDateTime\n            );\n            return transformHotwireResponse(check hotwireResponse.getXmlPayload());\n        }\n\n        worker avis returns CarRental[]|error {\n            AvisResponse avisResponse = check avisEP->/cars/catalog/v1/vehicles/rates.get(brand = \"Avis\",\n                country_code = \"US\", dropOff_date = dropOffDateTime, dropoff_location = dropOffLocation,\n                pickup_date = pickupDateTime, pickup_location = pickupLocation\n            );\n            return transformAvisResponse(avisResponse);\n        }\n\n        var responses = wait {hotwire, avis};\n        return map from var [vendor, carRental] in responses.entries()\n            where carRental !is error\n            select [vendor, carRental];\n    }\n}\n\nfunction transformHotwireResponse(xml response) returns CarRental[] {\n    return from xml item in response/<Response>/<Car>\n        select {\n            carType: (item/<CarType>).data(),\n            price: (item/<Price>).data(),\n            resultLink: (item/<ResultLink>).data(),\n            vendor: \"Hotwire\"\n        };\n}\n\nfunction transformAvisResponse(AvisResponse response) returns CarRental[] {\n    return from var {carType, price, resultLink, vendor} in response.result\n        select {carType, price, resultLink, vendor};\n}"
      }
    ]
  },
  "routing-slip": {
    "slug": "routing-slip",
    "name": "Routing Slip",
    "description": "Route the message to the next component according to the sequence of processing steps specified in a routing slip.",
    "helps": "<p>Ballerina excels in enabling the seamless integration of diverse services with inherent concurrent support, as well as in data binding, type enforcement, and native error-handling capabilities.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/RoutingTable.html",
    "tags": [
      "Routing Slip",
      "Message Channel",
      "Message Endpoint",
      "Message Router"
    ],
    "category": "Message Routing",
    "index": 33,
    "icon": "/images/patterns/routing-slip.svg",
    "codeFiles": [
      {
        "name": "routing-slip-main.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype PaymentRequest record {|\n    string mobileNumber;\n    string customerName;\n    float totalAmount;\n    string storeCode;\n    record {}[] items;\n|};\n\ntype PaymentStatus record {|\n    string status;\n    record {\n        float totalPoints;\n        float redeemedAmount;\n        float totalAmount;\n    } details;\n|};\n\ntype Message record {|\n    *PaymentRequest;\n    string storeCode;\n    string[] routingSlip = [];\n|};\n\ntype Points record {\n    float loyaltyPoints = 0.0;\n    float mobilePoints = 0.0;\n};\n\nservice /api/v1 on new http:Listener(8080) {\n    resource function post payments(PaymentRequest request) returns PaymentStatus|error {\n        string[] routingSlip = check lookupMessageSlip(request);\n        Message message = {...request, routingSlip: routingSlip};\n        Points points = {};\n        if message.routingSlip.length() > 0 {\n            http:Client pointHandler = check new (\"http://localhost:8081/loyaltyPoints\");\n            json payload = {\n                storeCode: message.storeCode,\n                mobileNumber: message.mobileNumber,\n                routingSlip: message.routingSlip\n            };\n            points = check pointHandler->/points.post(payload);\n        }\n        return checkout(message, points);\n    }\n}\n\nfunction checkout(Message message, Points points) returns PaymentStatus {\n    float totalPoints = points.loyaltyPoints + points.mobilePoints;\n    return {\n        status: \"SUCCESS\",\n        details: {\n            totalPoints: totalPoints,\n            redeemedAmount: totalPoints * 50,\n            totalAmount: message.totalAmount - (totalPoints * 50)\n        }\n    };\n}\n\nfunction lookupMessageSlip(PaymentRequest request) returns string[]|error {\n    http:Client openLoyalty = check new (\"http://openloyalty.com.balmock.io\");\n    anydata|error customer = openLoyalty->/api/[request.storeCode]/member/'check/get();\n    string[] routingSlip = [];\n    if customer is anydata {\n        routingSlip.push(\"CustomerLoyaltyPoints\");\n    }\n    if check isRegisteredToPointsService(request.mobileNumber) {\n        routingSlip.push(\"MobilePoints\");\n    }\n    return routingSlip;\n}\n\nfunction isRegisteredToPointsService(string mobileNumber) returns boolean|error {\n    http:Client openLoyalty = check new (\"http://mob.points.hub.com.balmock.io\");\n    anydata|error memberCheck = openLoyalty->/api/[mobileNumber]/member/'check/get();\n    return memberCheck is error ? false : true;\n}"
      },
      {
        "name": "loyalty-point-service.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype Request record {|\n    string storeCode;\n    string mobileNumber;\n    string[] routingSlip;\n|};\n\ntype Points record {|\n    float loyaltyPoints = 0.0;\n    float mobilePoints = 0.0;\n    float crypto = 0.0;\n|};\n\nservice /loyaltyPoints on new http:Listener(8081) {\n    resource function post points(Request request) returns Points|error {\n        Points totalPoints = {};\n        foreach string process in request.routingSlip {\n            match process {\n                \"CustomerLoyaltyPoints\" => {\n                    totalPoints.loyaltyPoints = check getShopLoyaltiPoints(request);\n                }\n                \"MobilePoints\" => {\n                    totalPoints.mobilePoints = check getMobilePoints(request);\n                }\n                \"Crypto\" => {\n                    totalPoints.crypto = check getCrypto(request);\n                }\n            }\n        }\n        return totalPoints;\n    }\n}\n\nfunction getShopLoyaltiPoints(Request request) returns float|error {\n    http:Client openLoyalty = check new (\"http://openloyalty.customer.com.balmock.io\");\n    record {float loyaltyPoints;} points = check openLoyalty->/api/[request.storeCode]/redemption/[request.mobileNumber].get();\n    return points.loyaltyPoints;\n}\n\nfunction getMobilePoints(Request request) returns float|error {\n    http:Client mobPoints = check new (\"http://mob.points.com.balmock.io\");\n    record {float mobilePoints;} points = check mobPoints->/api/[request.mobileNumber]/redemption.get();\n    return points.mobilePoints;\n}\n\nfunction getCrypto(Request request) returns float|error {\n    http:Client crypto = check new (\"http://crypto.com.balmock.io\");\n    record {float crypto;} points = check crypto->/api/[request.mobileNumber].get();\n    return points.crypto;\n}"
      }
    ]
  },
  "process-manager": {
    "slug": "process-manager",
    "name": "Process Manager",
    "description": "The process manager orchestrates a sequence of steps that are not known at design time.",
    "helps": "<p>Ballerina provides control flow constructs such as <code>if</code>-<code>else</code> and <code>match</code> statements to implement complex process flows.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/ProcessManager.html",
    "tags": [
      "Process Manager",
      "Command Message",
      "Aggregator",
      "Point-to-Point Channel"
    ],
    "category": "Message Routing",
    "index": 34,
    "icon": "/images/patterns/process-manager.svg",
    "codeFiles": [
      {
        "name": "process-manager.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype OrderRequest record {|\n    string email;\n    Address address;\n    OrderItemRequest[] orderItems;\n|};\n\ntype OrderResponse record {|\n    string email;\n    string currency;\n    float total;\n    Address address;\n    OrderItemResponse[] orderItems;\n    string trackingNumber;\n|};\n\ntype Address record {|\n    string fullName;\n    string address1;\n    string phone;\n    string city;\n    string country;\n|};\n\ntype OrderItemRequest record {\n    string itemName;\n    int quantity;\n};\n\ntype OrderItemResponse record {|\n    string itemName;\n    int quantity;\n    float price;\n    string currencyCode;\n|};\n\ntype ShipmentRequest record {|\n    float amount;\n    string currency;\n    string personName;\n    string email;\n    DHLAddress|FedexAddress address;\n|};\n\ntype FedexAddress record {|\n    string address1;\n    string city;\n    string country;\n    string phoneNumber;\n|};\n\ntype DHLAddress record {|\n    string name;\n    *FedexAddress;\n|};\n\ntype FedexResponse record {|\n    string transactionId;\n    string trackingNumber;\n|};\n\ntype DHLResponse record {|\n    string trackingNumber;\n|};\n\nfinal http:Client shopify = check new (\"http://BlackwellsBooks.myshopify.com.balmock.io\");\nfinal http:Client dhlExpress = check new (\"http://express.api.dhl.com.balmock.io\");\nfinal http:Client fedEx = check new (\"http://api.fedex.com.balmock.io\");\nfinal http:Client sendgrid = check new (\"http://api.sendgrid.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    resource function post orders(OrderRequest orderReq) returns error? {\n        OrderResponse response = check shopify->/admin/api/orders\\.json.post(orderReq);\n        string trackingNumber;\n        if response.address.country == \"United States\" {\n            FedexResponse fedexResp = check createFedexShipment(response);\n            trackingNumber = fedexResp.trackingNumber;\n        } else {\n            DHLResponse dhlResp = check creeateDhlShipment(response);\n            trackingNumber = dhlResp.trackingNumber;\n        }\n        var _ = start sendConfirmationMail(response.address.fullName, response.email, trackingNumber);\n    }\n}\n\nfunction createFedexShipment(OrderResponse response) returns FedexResponse|error {\n    ShipmentRequest fedexReq = {\n        amount: response.total,\n        currency: response.currency,\n        personName: response.address.fullName,\n        email: response.email,\n        address: {\n            address1: response.address.address1,\n            city: response.address.city,\n            country: response.address.country,\n            phoneNumber: response.address.phone\n        }\n    };\n\n    return check fedEx->/api/en\\-us/catalog/ship/v1/shipments.post(fedexReq);\n\n}\n\nfunction creeateDhlShipment(OrderResponse response) returns DHLResponse|error {\n    ShipmentRequest dhlReq = {\n        amount: response.total,\n        currency: response.currency,\n        personName: response.address.fullName,\n        email: response.email,\n        address: {\n            name: response.address.fullName,\n            address1: response.address.address1,\n            city: response.address.city,\n            country: response.address.country,\n            phoneNumber: response.address.phone\n        }\n    };\n\n    return check dhlExpress->/mydhlapi/shipments.post(dhlReq);\n}\n\nfunction sendConfirmationMail(string name, string email, string trackingNumber) returns error? {\n    string body = string `<p>Hello ${name}!</p><p>Your Order has been shipped. ` +\n                  string `Track your order using ${trackingNumber}</p>`;\n    var mailReq = {\n        toInfo: email,\n        fromInfo: \"orders@blackwell.com\",\n        subject: \"Order Confirmation\",\n        content: body\n    };\n\n    _ = check sendgrid->/v3/mail/send.post(mailReq, targetType = json);\n}"
      }
    ]
  },
  "envelope-wrapper": {
    "slug": "envelope-wrapper",
    "name": "Envelope Wrapper",
    "description": "Envelope Wrapper wraps application data inside an envelope that is compliant with the messaging infrastructure.",
    "helps": "<p>Ballerina provides a rich set of libraries to interact with various messaging protocols. Ballerina allows you to extract information from messages and create new messages, manipulating data in both the body and the header.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/EnvelopeWrapper.html",
    "tags": [
      "Envelope Wrapper",
      "Content Enricher",
      "Message Channel",
      "Message"
    ],
    "category": "Message Transformation",
    "index": 36,
    "icon": "/images/patterns/envelope-wrapper.svg",
    "codeFiles": [
      {
        "name": "envelope-wrapper.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype RefundRequest record {|\n    string request_id;\n    string email;\n    string client_id;\n    string capture_id;\n|};\n\ntype PaypalRespose record {|\n    string status;\n    string message;\n|};\n\nfinal http:Client paypalClient = check new (\"http://api-m.sandbox.paypal.com.balmock.io\");\nfinal string encodedHeader = {alg: \"none\"}.toString().toBytes().toBase64();\n\nservice /paypal on new http:Listener(8080) {\n    resource function post refund(RefundRequest refundReq) returns PaypalRespose|error {\n        // Generate PayPal-Auth-Assertion.\n        string authAssertionValue = getAuthAssertionValue(refundReq.client_id, refundReq.email);\n\n        http:Request request = new;\n        request.addHeader(\"PayPal-Request-Id\", refundReq.request_id);\n        request.addHeader(\"PayPal-Auth-Assertion\", authAssertionValue);\n        return paypalClient->/v2/payments/captures/[refundReq.capture_id]/refund.post(request);\n    }\n}\n\nisolated function getAuthAssertionValue(string client_id, string email) returns string {\n    map<string> payload = {\n        iss: client_id,\n        payer_id: email\n    };\n    string encodedPayload = payload.toString().toBytes().toBase64();\n    return string `${encodedHeader}.${encodedPayload}.`;\n}"
      }
    ]
  },
  "content-enricher": {
    "slug": "content-enricher",
    "name": "Content Enricher",
    "description": "Content enricher adds data that was not sent by the original sender to the message.",
    "helps": "<p>Ballerina enables additional lookups to enrich the message, such as database lookups, REST API calls, etc. Spread operator (...) helps to create new records out of existing records while enriching them with additional data.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/DataEnricher.html",
    "tags": [
      "Content Enricher",
      "Message Channel",
      "Message Endpoint",
      "Message"
    ],
    "category": "Message Transformation",
    "index": 37,
    "icon": "/images/patterns/content-enricher.svg",
    "codeFiles": [
      {
        "name": "content-enricher.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype BankAccountReq record {|\n    string name;\n    string accountNumber;\n    string routingNumber;\n    string? country;\n|};\n\ntype IbanRequest record {|\n    \"json\"|\"xml\" format = \"json\";\n    string country_iso;\n    string nid;\n|};\n\ntype IbanResponse record {\n    string bank_code;\n};\n\ntype BankAccount record {\n    *BankAccountReq;\n    string id;\n    string? bankCode;\n};\n\nfinal http:Client iban = check new (\"http://api.iban.com.balmock.io\");\nfinal http:Client intuit = check new (\"http://api.intuit.com.balmock.io\");\n\nservice /finance on new http:Listener(8080) {\n\n    resource function post customers/[int id]/accounts(BankAccountReq req) returns BankAccount|error {\n        IbanRequest ibanReq = {country_iso: req.country ?: \"US\", nid: req.accountNumber};\n        IbanResponse ibanRes = check iban->/clients/api/banksuite/nid.post(ibanReq);\n        return check intuit->/quickbooks/v4/customers/[id]/bank\\-accounts.post({...req, bankCode: ibanRes.bank_code});\n    }\n}"
      }
    ]
  },
  "content-filter": {
    "slug": "content-filter",
    "name": "Content Filter",
    "description": "The content filter removes data from the original message and can also be employed to simplify the message structure.",
    "helps": "<p>Ballerina excels at manipulating data and handling diverse formats, structures, and transformations. The <a href=\"/learn/by-example/query-expressions/\">query expression</a> (<code>from</code> keyword) is useful for transforming messages. The <code>select</code> clause, as shown below, can be used to create new records from existing ones while refining data. The <code>where</code> clause can be used to filter items from an array.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/ContentFilter.html",
    "tags": [
      "Content Filter",
      "Message Channel",
      "Message Endpoint"
    ],
    "category": "Message Transformation",
    "index": 38,
    "icon": "/images/patterns/content-filter.svg",
    "codeFiles": [
      {
        "name": "content-filter.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype DetailedReimbursementTemplate record {\n    string reimbursementTypeID;\n    string reimbursementTypeName;\n    float fixedAmount;\n};\n\ntype ReimbursementTemplate record {\n    string reimbursementTypeID;\n    float fixedAmount;\n};\n\ntype Reimbursement record {\n    string id;\n    record {\n        string reimbursementTypeID;\n        float fixedAmount;\n    }[] reimbursementTemplates;\n};\n\nfinal http:Client xero = check new (\"http://api.xero.com.balmock.io\");\n\nservice /payroll on new http:Listener(8080) {\n\n    resource function post employees/[string id]/paytemplate/reimbursements(DetailedReimbursementTemplate[] templates)\n            returns Reimbursement|error {\n        ReimbursementTemplate[] reimbursementRequests = from var {reimbursementTypeID, fixedAmount} in templates\n                                                        select {reimbursementTypeID, fixedAmount};\n        return xero->/payrollxro/employees/[id]/paytemplate/reimbursements.post(reimbursementRequests);\n    }\n}"
      }
    ]
  },
  "claim-check": {
    "slug": "claim-check",
    "name": "Claim Check",
    "description": "Claim Check will store messages in a persistent storage and send a claim to another application to access the origin stored message.",
    "helps": "<p>Ballerina supports the persistent storage of messages. Popular storage technologies such as SQL, AWS S3, and Redis are available as Ballerina packages.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/StoreInLibrary.html",
    "tags": [
      "Claim Check",
      "Content Enricher",
      "Content Filter"
    ],
    "category": "Message Transformation",
    "index": 39,
    "icon": "/images/patterns/claim-check.svg",
    "codeFiles": [
      {
        "name": "claim-check-consumer.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerina/io;\nimport ballerinax/kafka;\n\ntype ScanResult [string, string];\n\nfinal http:Client awsS3Client = check new (\"http://bucket.s3.amazonaws.com.balmock,io\");\nfinal http:Client firebaseClient = check new (\"http://api.mriresults.firebase.com.balmock.io\");\nfinal kafka:Consumer kafkaConsumer = check new (kafka:DEFAULT_URL, {\n    groupId: \"mri-scan-group\",\n    topics: [\"topic-mri-scan\"]\n});\n\npublic function main() returns error? {\n    while true {\n        ScanResult[] mriScanResults = check kafkaConsumer->pollPayload(1);\n        foreach var [scanId, patientId] in mriScanResults {\n            http:Response s3Response = check awsS3Client->/mri\\-scans/[scanId].get();\n            string mriScanResult = analyzeMriScan(check s3Response.getByteStream());\n            _ = check firebaseClient->/mri/[scanId]/reports\\.json.put({mriScanResult, patientId}, targetType = json);\n        }\n    }\n}\n\nisolated function analyzeMriScan(stream<byte[], io:Error?> fileByteStream) returns string {\n    // logic to analyze the MRI scan\n    return \"No Abnormalities Detected\";\n}"
      },
      {
        "name": "claim-check-producer.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerina/io;\nimport ballerina/mime;\nimport ballerina/uuid;\nimport ballerinax/kafka;\n\nfinal http:Client awsS3Client = check new (\"http://bucket.s3.amazonaws.com.balmock,io\");\nfinal kafka:Producer kafkaProducer = check new (kafka:DEFAULT_URL);\n\ntype ScanRequest record {|\n    string patientId;\n    stream<byte[], io:Error?> fileByteStream;\n|};\n\nservice /api/v1 on new http:Listener(8080) {\n\n    isolated resource function post scans/mri(http:Request request) returns error? {\n        ScanRequest {patientId, fileByteStream} = check scanRequestFromMultipart(request);\n\n        string claimCheckId = uuid:createType1AsString();\n        string fileName = string `${claimCheckId}.dicom`;\n\n        http:Request s3ObjectCreationRequest = new;\n        s3ObjectCreationRequest.setByteStream(fileByteStream);\n        _ = check awsS3Client->/mri\\-scans/[fileName].put(s3ObjectCreationRequest, targetType = http:Response);\n\n        _ = check kafkaProducer->send({\n            topic: \"topic-mri-scan\",\n            value: [fileName, patientId]\n        });\n    }\n}\n\nisolated function scanRequestFromMultipart(http:Request request) returns ScanRequest|error {\n    mime:Entity[] bodyParts = check request.getBodyParts();\n    string? patientId = ();\n    stream<byte[], io:Error?>? fileByteStream = ();\n    foreach mime:Entity bodyPart in bodyParts {\n        string partName = bodyPart.getContentDisposition().name;\n        if partName == \"patientId\" {\n            patientId = check bodyPart.getText();\n        } else if partName == \"file\" {\n            fileByteStream = check bodyPart.getByteStream();\n        }\n    }\n    if patientId == () || fileByteStream == () {\n        return error(\"Multipart request should contains both patientId and file parts\");\n    }\n    return {fileByteStream, patientId};\n}"
      }
    ]
  },
  "normalizer": {
    "slug": "normalizer",
    "name": "Normalizer",
    "description": "Normalizer routes each message type through a custom message translator so that the resulting messages match a common format.",
    "helps": "<p>Ballerina's type test (<code>is</code> keyword) and match statement can both be used to test the structure of incoming data. Then the data can be transformed into the required format to construct new data structures. Ballerina's data-oriented design helps with complex transformations with features such as destructuring, query expressions, spread operator, etc.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Normalizer.html",
    "tags": [
      "Normalizer",
      "Message Channel",
      "Message Endpoint",
      "Message Translator",
      "Message Router",
      "Message"
    ],
    "category": "Message Transformation",
    "index": 40,
    "icon": "/images/patterns/normalizer.svg",
    "codeFiles": [
      {
        "name": "normalizer.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype ZendeskResponse record {\n    record {|\n        string url;\n        int id;\n        string subject;\n    |} ticket;\n};\n\nfinal http:Client zendeskClient = check new (\"http://api.zendesk.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function post ticket(@http:Payload json|xml request) returns string|error {\n        json normalizedRequest;\n        if request is json {\n            normalizedRequest = normalize(check request.subject, check request.comment);\n        } else {\n            normalizedRequest = normalize((request/<subject>).data(), (request/<comment>).data());\n        }\n        ZendeskResponse zendeskResponse = check zendeskClient->/api/v2/tickets.post(normalizedRequest);\n        return zendeskResponse.ticket.url;\n    }\n}\n\nfunction normalize(string subject, string comment) returns json {\n    return {\n        ticket: {\n            subject,\n            comment: {\n                body: comment\n            }\n        }\n    };\n}"
      }
    ]
  },
  "canonical-data-model": {
    "slug": "canonical-data-model",
    "name": "Canonical Data Model",
    "description": "The Canonical Data Model is a common message format used by different applications for communication.",
    "helps": "<p>Ballerina provides powerful data modelling capabilities through its Type System. You can define data types like JSON and xml, and structures like records to represent your canonical data model. This ensures interoperability when integrating different components in your system, making it easier to exchange data seamlessly.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/CanonicalDataModel.html",
    "tags": [
      "Canonical Data Model",
      "Message Router",
      "Message Translator",
      "Format Indicator"
    ],
    "category": "Message Transformation",
    "index": 41,
    "icon": "/images/patterns/canonical-data-model.svg",
    "codeFiles": [
      {
        "name": "canonical-data-model.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\nconst PROJECT_ID = \"LAND-TEST04\";\nconst DATASET_ID = \"f57074a0-a8b6-403e-9df1-e9fc46\";\n\nfinal http:Client gMapClient = check new (\"http://mapsplatformdatasets.googleapis.com.balmock.io\");\nfinal http:Client microsoftClient = check new (\"http://atlas.microsoft.com.balmock.io\");\n\ntype Gpx xml;\n\ntype Kml xml;\n\ntype Csv record {|\n    float X;\n    float Y;\n    string Name;\n    string Description;\n|}[];\n\ntype GeoJson record {\n    string 'type = \"FeatureCollection\";\n    string name = \"PlaceMarks\";\n    Feature[] features;\n};\n\ntype Feature record {|\n    string 'type = \"Feature\";\n    record {|\n        string X;\n        string Y;\n        string Name;\n        string description;\n    |} properties;\n    record {|\n        string 'type = \"Point\";\n        string[] coordinates;\n    |} geometry;\n|};\n\ntype GMapResponse record {\n    string name;\n    string displayName;\n    string createTime;\n};\n\ntype MicrosoftMapResponse record {\n    string formatVersion;\n    record {\n        record {\n            string latitude;\n            string longitude;\n        }[] points;\n    }[] routes;\n};\n\nservice /map on new http:Listener(8080) {\n    resource function post uploadPlaceMarks(http:Request request) returns GMapResponse|error? {\n        Csv|Gpx data = check getPayload(request);\n        GeoJson geoJson = convertToCanonical(data);\n        Kml kmlData = convertFromCanonicalToKml(geoJson);\n        GMapResponse gMapResponse = check gMapClient->post(\n            string `/v1/projects/${PROJECT_ID}/datasets/${DATASET_ID}:import`, kmlData);\n        return gMapResponse;\n    }\n\n    resource function post getRouteDirection(http:Request request, string query) returns MicrosoftMapResponse|error {\n        Csv|Gpx data = check getPayload(request);\n        GeoJson geoJson = convertToCanonical(data);\n        MicrosoftMapResponse microsoftMapResponse = check microsoftClient->/route/directions/'json.post(\n            {\"supportingPoints\": geoJson.toJson()}, {query: string `${query}`}\n        );\n        return microsoftMapResponse;\n    }\n}\n\nisolated function convertToCanonical(Csv|Gpx data) returns GeoJson {\n    if data is Csv {\n        return convertFromCsvToCanonical(data);\n    } else {\n        return convertFromGpxToCanonical(data);\n    }\n}\n\nisolated function getPayload(http:Request request) returns Csv|Gpx|error {\n    if request.getContentType().includes(\"xml\") {\n        return request.getXmlPayload();\n    }\n    json data = check request.getJsonPayload();\n    return data.cloneWithType(Csv);\n}\n\nisolated function convertFromCsvToCanonical(Csv data) returns GeoJson {\n    return {\n        features: from var member in data\n                  let string X = member.X.toString(), string Y = member.Y.toString()\n                  select {\n                      properties: {X, Y, Name: member.Name, description: member.Description},\n                      geometry: {coordinates: [X, Y]}\n                  }\n    };\n}\n\nisolated function convertFromGpxToCanonical(Gpx gpxData) returns GeoJson {\n    return {\n        features: from var extension in gpxData/**/<extensions>\n            select {\n                properties: {\n                    X: (extension/**/<X>).data(),\n                    Y: (extension/**/<X>).data(),\n                    Name: (extension/**/<Name>).data(),\n                    description: (extension/**/<description>).data()\n                },\n                geometry: {coordinates: [(extension/**/<X>).data(), (extension/**/<Y>).data()]}\n            }\n    };\n}\n\nisolated function convertFromCanonicalToKml(GeoJson geoJson) returns Kml {\n    xml kmlData = xml `<kml>\n        <Document>\n            <Schema id=\"temp\">\n                <SimpleField name=\"X\" type=\"double\"/>\n                <SimpleField name=\"Y\" type=\"double\"/>\n                <SimpleField name=\"Name\" type=\"string\"/>\n            </Schema>\n            ${from Feature feature in geoJson.features\n              select xml `<Placemark>\n                            <description>${feature.properties.description}</description>\n                            <Point>\n                                <coordinates>\n                                    ${feature.geometry.coordinates[0]},${feature.geometry.coordinates[1]}\n                                </coordinates>\n                            </Point>\n                          </Placemark>`}\n            </Document>\n        </kml>`;\n    return kmlData;\n}"
      }
    ]
  },
  "point-to-point-channel": {
    "slug": "point-to-point-channel",
    "name": "Point-to-Point Channel",
    "description": "Point-to-Point Channel ensures that only one receiver consumes any given message.",
    "helps": "<p>Ballerina supports a rich set of libraries to support various messaging protocols. These protocols support point-to-point messaging semantics. E.g.: HTTP, gRPC, GraphQL.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/PointToPointChannel.html",
    "tags": [
      "Point-to-Point Channel",
      "Message Channel",
      "Command Message"
    ],
    "category": "Messaging Channels",
    "index": 6,
    "icon": "/images/patterns/point-to-point-channel.svg",
    "codeFiles": [
      {
        "name": "point-to-point-channel.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype ProductCreationResponse record {|\n    boolean success;\n    string id;\n|};\n\nfinal http:Client zuora = check new (\"http://rest.zuora.com.balmock.io\");\n\npublic function main() returns error? {\n    var product = {\n        \"Description\": \"Cell phone service for call center operators\",\n        \"EffectiveEndDate\": \"2025-10-01\",\n        \"EffectiveStartDate\": \"2023-10-01\",\n        \"Name\": \"Cell Phone Service\",\n        \"SKU\": \"API-SKU09723199712\"\n    };\n    _ = check zuora->/v1/'object/product.post(product, targetType = ProductCreationResponse);\n}"
      }
    ]
  },
  "publish-subscribe-channel": {
    "slug": "publish-subscribe-channel",
    "name": "Publish-Subscribe Channel",
    "description": "Publish-Subscribe Channel delivers a copy of a particular event to each receiver.",
    "helps": "<p>Ballerina has a rich set of packages to interact with various messaging protocols. These include protocols that support publish-subscribe semantics such as Kafka, MQTT, and WebSocket.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/PublishSubscribeChannel.html",
    "tags": [
      "Publish-Subscribe Channel",
      "Message Channel",
      "Message Endpoint",
      "Message Router"
    ],
    "category": "Messaging Channels",
    "index": 7,
    "icon": "/images/patterns/publish-subscribe-channel.svg",
    "codeFiles": [
      {
        "name": "publisher.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerinax/kafka;\n\ntype MatchEvent record {|\n    string matchId;\n    string time;\n    string event;\n    string description;\n|};\n\nservice /api on new http:Listener(8080) {\n\n    private final kafka:Producer kafkaPublisher;\n\n    function init() returns error? {\n        self.kafkaPublisher = check new (kafka:DEFAULT_URL);\n    }\n\n    resource function post cricket/matches/[string matchId]/event(MatchEvent event) returns error? {\n        check self.kafkaPublisher->send({\n            topic: matchId,\n            value: event\n        });\n    }\n}"
      },
      {
        "name": "subscriber.bal",
        "language": "ballerina",
        "content": "import ballerina/uuid;\nimport ballerina/websocket;\nimport ballerinax/kafka;\n\nservice /ws on new websocket:Listener(8081) {\n\n    resource function get [string matchId]() returns websocket:Service|error {\n        return new MatchUpdateService(matchId);\n    }\n}\n\nisolated service class MatchUpdateService {\n    *websocket:Service;\n    private final kafka:Consumer kafkaConsumer;\n\n    public function init(string matchId) returns error? {\n        self.kafkaConsumer = check new (kafka:DEFAULT_URL, {\n            groupId: string `realtime-web-ui-group-${uuid:createType1AsString()}`,\n            topics: [matchId]\n        });\n    }\n\n    isolated remote function onOpen(websocket:Caller caller) returns error? {\n        while true {\n            anydata[] matchDetails = check self.kafkaConsumer->pollPayload(1);\n            from var matchDetail in matchDetails\n            do {\n                check caller->writeMessage(matchDetail);\n            };\n        }\n    }\n}"
      }
    ]
  },
  "channel-adapter": {
    "slug": "channel-adapter",
    "name": "Channel Adapter",
    "description": "The channel adapter is an interface to interact with a channel.",
    "helps": "<p>Ballerina supports a rich set of Connectors to interact with different applications. Developers can create their connectors and publish them as a package.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/ChannelAdapter.html",
    "tags": [
      "Channel Adapter",
      "Message Channel",
      "Messaging"
    ],
    "category": "Messaging Channels",
    "index": 12,
    "icon": "/images/patterns/channel-adapter.svg",
    "codeFiles": [
      {
        "name": "channel-adapter.bal",
        "language": "ballerina",
        "content": "import ballerina/io;\nimport ballerinax/jira;\n\nconfigurable string username = \"admin\";\nconfigurable string password = \"admin\";\n\nfinal jira:ConnectionConfig jiraConfig = {\n    auth: {\n        username,\n        password\n    }\n};\n\nfinal jira:Client jiraAdapter = check new (jiraConfig, \"http://wso2.jira.com.balmock.io\");\n\npublic function main() returns error? {\n    jira:Project result = check jiraAdapter->getProject(\"EI-Patterns-With-Ballerina\");\n    io:println(result.toString());\n}"
      }
    ]
  },
  "messaging-bridge": {
    "slug": "messaging-bridge",
    "name": "Messaging Bridge",
    "description": "Massaging bridge connects multiple messaging systems by mapping channels and transforming message formats.",
    "helps": "<p>Single Ballerina program can connect to multiple messaging systems. Each system may utilize different protocols and message formats. Protocols such as HTTP, GRPC, Kafka, JDBC, etc. are supported via Ballerina's rich set of stranded libraries. JSON and XML are supported at the type system level. Other formats such as CSV and EDI are supported via libraries.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingBridge.html",
    "tags": [
      "Messaging Bridge",
      "Message Channel",
      "Message Endpoint",
      "Channel Adapter",
      "Message"
    ],
    "category": "Messaging Channels",
    "index": 13,
    "icon": "/images/patterns/messaging-bridge.svg",
    "codeFiles": [
      {
        "name": "messaging-bridge.bal",
        "language": "ballerina",
        "content": "import ballerina/graphql;\nimport ballerina/http;\n\ntype ProjectRequest record {|\n    string projectName;\n    string description;\n    string customerName;\n|};\n\ntype Project record {|\n    *ProjectRequest;\n    string projectID;\n    Task[] tasks;\n|};\n\ntype Task record {|\n    string taskID;\n    string description;\n|};\n\nfinal http:Client zoho = check new (\"http://zohoapis.com.balmock.io\");\n\nservice /api/v1 on new graphql:Listener(8080) {\n\n    resource function get project(string organizationID, string projectID) returns Project|error {\n        return zoho->/books/v3/projects/[projectID].get(organization_id = organizationID);\n    }\n\n    remote function createProject(string organizationID, ProjectRequest projectRequest) returns Project|error {\n        return zoho->/books/v3/projects.post(projectRequest, organization_id = organizationID);\n    }\n}"
      }
    ]
  },
  "messaging-gateway": {
    "slug": "messaging-gateway",
    "name": "Messaging Gateway",
    "description": "Messaging Gateway wraps messaging-specific method calls and exposes domain-specific methods to the application.",
    "helps": "<p>Ballerina's classes and modules help to create wrappers and expose domain-specific functions and methods.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingGateway.html",
    "tags": [
      "Messaging Gateway",
      "Message"
    ],
    "category": "Messaging Endpoints",
    "index": 42,
    "icon": "/images/patterns/messaging-gateway.svg",
    "codeFiles": [
      {
        "name": "messaging-gateway.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerina/io;\n\npublic type ActivateLine readonly & record {|\n    string customerId;\n    string phoneNumber;\n    \"NEW ACTIVATION\"|\"TRANSFER\" activationType;\n    string planCode;\n    string activationDate;\n|};\n\ntype ActivationResponse readonly & record {|\n    string phoneNumber;\n    \"REJECTED\"|\"APPROVED\" status;\n|};\n\ntype ActivationSuccess readonly & record {|\n    string phoneNumber;\n|};\n\ntype ActivationFailureError error;\n\npublic class LineConnectionManager {\n\n    private final http:Client lineClinet;\n\n    public function init() returns error? {\n        self.lineClinet = check new (\"http://api.telcox.com.balmock.io\");\n    }\n\n    public function activateLine(ActivateLine activateLine) returns ActivationSuccess|ActivationFailureError {\n        ActivationResponse|error activationResponse =\n            self.lineClinet->/plans/[activateLine.planCode]/activate.post(activateLine);\n        if activationResponse is error || activationResponse.status == \"REJECTED\" {\n            return error(\"Connection activation failure\", phoneNumber = activateLine.phoneNumber);\n        }\n        return {phoneNumber: activateLine.phoneNumber};\n    }\n}\n\npublic function main() returns error? {\n    ActivateLine activateLine = {\n        customerId: \"USER-USW-0012300912\",\n        phoneNumber: \"555-555-5555\",\n        activationType: \"NEW ACTIVATION\",\n        planCode: \"PLN123\",\n        activationDate: \"2023-09-19\"\n    };\n\n    LineConnectionManager lineConnectionManager = check new;\n    ActivationSuccess|ActivationFailureError activateLineResult = lineConnectionManager.activateLine(activateLine);\n    io:println(activateLineResult);\n}"
      }
    ]
  },
  "messaging-mapper": {
    "slug": "messaging-mapper",
    "name": "Messaging Mapper",
    "description": "The Messaging Mapper maps infrastructure messages to domain objects.",
    "helps": "<p>Ballerina services facilitate the direct mapping of incoming and outgoing domain objects to JSON values. Ballerina's table data structure offers the ability to store domain objects in memory, closely resembling the functionality of SQL-based tables.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingMapper.html",
    "tags": [
      "Messaging Mapper",
      "Message Translator"
    ],
    "category": "Messaging Endpoints",
    "index": 43,
    "icon": "/images/patterns/messaging-mapper.svg",
    "codeFiles": [
      {
        "name": "messaging-mapper.bal",
        "language": "ballerina",
        "content": "import ballerina/graphql;\nimport ballerina/uuid;\n\npublic type Item record {|\n    string code;\n    int quantity;\n    decimal unitPrice;\n|};\n\npublic type PurchasingRequest record {|\n    string customerId;\n    string agentId;\n    Item[] items;\n|};\n\npublic type Invoice record {|\n    *PurchasingRequest;\n    readonly string invoiceId;\n    decimal total;\n|};\n\nfinal table<Invoice> key(invoiceId) invoices = table [];\n\nservice /api/v1 on new graphql:Listener(8080) {\n\n    resource function get invoice(string invoiceId) returns Invoice? {\n        return invoices[invoiceId];\n    }\n\n    remote function createInvoice(PurchasingRequest purchasingRequest) returns Invoice {\n        Invoice invoice = {\n            ...purchasingRequest,\n            invoiceId: uuid:createType1AsString(),\n            total: from var {unitPrice, quantity} in purchasingRequest.items\n                   let var itemTotalPrice = unitPrice * quantity\n                   collect sum(itemTotalPrice)\n        };\n        invoices.add(invoice);\n        return invoice;\n    }\n}"
      }
    ]
  },
  "polling-consumer": {
    "slug": "polling-consumer",
    "name": "Polling Consumer",
    "description": "Polling consumer consumes messages from a channel when the application is ready to process them.",
    "helps": "<p>Ballerina's concurrency model enables writing simple procedural code that is nevertheless executed in a non-blocking manner. In the below example, <code>sleep</code> does not block the underlying thread. Other Ballerina concurrency constructs, such as <code>wait</code>, behave similarly.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/PollingConsumer.html",
    "tags": [
      "Polling Consumer",
      "Durable Subscriber",
      "Message"
    ],
    "category": "Messaging Endpoints",
    "index": 45,
    "icon": "/images/patterns/polling-consumer.svg",
    "codeFiles": [
      {
        "name": "polling-consumer.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerina/lang.runtime;\n\nenum Status {\n    CREATED,\n    CAPTURED,\n    DENIED,\n    PENDING\n}\n\ntype PaypalResponse record {|\n    string id;\n    Status status;\n    Amount amount;\n    Payee payee;\n|};\n\ntype Amount record {|\n    string value;\n    string currency_code;\n|};\n\ntype Payee record {|\n    string email_address;\n    string merchant_id;\n|};\n\nfinal http:Client paypalClient = check new (\"http://api-m.paypal.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    resource function get payment(string paymentId) returns string|error {\n        foreach int _ in 0 ..< 10 {\n            PaypalResponse response = check paypalClient->/v2/payments/authorizations/[paymentId]();\n            if response.status == CREATED || response.status == PENDING {\n                runtime:sleep(5); // sleep does not block the underlying thread\n            } else {\n                return response.status;\n            }\n        }\n        return error(\"Payment timed out\");\n    }\n}"
      }
    ]
  },
  "message-dispatcher": {
    "slug": "message-dispatcher",
    "name": "Message Dispatcher",
    "description": "Message dispatcher coordinates message processing among multiple performers.",
    "helps": "<p>Ballerina programs can maintain the state internally using variables and perform logic based on the state.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageDispatcher.html",
    "tags": [
      "Message Dispatcher",
      "Competing Consumers",
      "Transactional Client"
    ],
    "category": "Messaging Endpoints",
    "index": 48,
    "icon": "/images/patterns/message-dispatcher.svg",
    "codeFiles": [
      {
        "name": "message-dispatcher.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\nfinal http:Client ocrClient = check new (\"http://api.ocr.com.balmock.io\");\n\ntype OcrResponse record {|\n    string[] lines;\n    int noOfLines;\n    string pdfUrl;\n|};\n\nfinal readonly & string[] ocrProcessors = [\"processor1\", \"processor2\", \"processor3\"];\n\nservice / on new http:Listener(8080) {\n    int processorNo = 0;\n\n    isolated resource function get ocr(string url) returns OcrResponse|error {\n        int currentProcessor;\n        lock {\n            currentProcessor = self.processorNo;\n            self.processorNo = currentProcessor == 2 ? 0 : currentProcessor + 1;\n        }\n        string processorId = ocrProcessors[currentProcessor];\n        return check ocrClient->/[processorId]/parse/imageurl(url = url);\n    }\n}"
      }
    ]
  },
  "selective-consumer": {
    "slug": "selective-consumer",
    "name": "Selective Consumer",
    "description": "Selective consumer filters the messages which come from a message channel using a criteria.",
    "helps": "<p>Ballerina supports rich set of messaging protocols. Some of these protocols supports channels with filtering capabilities.  Below example uses GraphQL's filtering capabilities to select the data it receives.  If a protocol does not support filtering, user may write their own logic using Ballerina control flow constructs such as <code>if</code>-<code>else</code> and <code>match</code> statements.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageSelector.html",
    "tags": [
      "Selective Consumer",
      "Message Filter",
      "Content Based Router",
      "Message"
    ],
    "category": "Messaging Endpoints",
    "index": 49,
    "icon": "/images/patterns/selective-consumer.svg",
    "codeFiles": [
      {
        "name": "selective-consumer.bal",
        "language": "ballerina",
        "content": "import ballerina/graphql;\nimport ballerina/io;\n\ntype InventoryResponse record {|\n    record {|Inventory[] products;|} data;\n|};\n\ntype Inventory record {|\n    string name;\n    int productsCount;\n|};\n\ntype CsvRecord record {|\n    string name;\n    RequestType requestType;\n|};\n\nenum RequestType {\n    REQUIRED,\n    URGENT\n};\n\nfinal graphql:Client shopify = check new (\"http://blackwellsbooks.myshopify.com.balmock.io\");\n\npublic function main(string category) returns error? {\n    string csvFilePath = \"./resources/orderRequests.csv\";\n    string document = string `{ products(productType: \"${category}\") { name, productsCount } } `;\n    InventoryResponse inventories = check shopify->execute(document);\n    CsvRecord[] csvContent = [];\n    foreach var {name, productsCount} in inventories.data.products {\n        if productsCount < 10 {\n            csvContent.push({name: name, requestType: URGENT});\n        } else if productsCount < 25 {\n            csvContent.push({name: name, requestType: REQUIRED});\n        }\n    }\n    check io:fileWriteCsv(csvFilePath, csvContent);\n}"
      }
    ]
  },
  "idempotent-receiver": {
    "slug": "idempotent-receiver",
    "name": "Idempotent Receiver",
    "description": "An idempotent receiver is a receiver that can safely receive the same message multiple times.",
    "helps": "<p>When implementing idempotent endpoints, such as HTTP PUT, users may use Ballerina to create logic that leaves the state in the same state even if the same message is received multiple times. Explicit de-duping can be implemented using Ballerina's rich set of packages to interact with databases and key-value stores, such as SQL and Redis.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/IdempotentReceiver.html",
    "tags": [
      "Idempotent Receiver",
      "Message",
      "Message Channel"
    ],
    "category": "Messaging Endpoints",
    "index": 51,
    "icon": "/images/patterns/idempotent-receiver.svg",
    "codeFiles": [
      {
        "name": "idempotent-receiver.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype OrderDetail record {\n    string orderId;\n    OrderStatus status;\n};\n\nenum OrderStatus {\n    CREATED,\n    SHIPPED,\n    COMPLETED,\n    CANCELLED\n};\n\nfinal map<OrderStatus> orderStatuses = {};\n\nservice /api/v1 on new http:Listener(8080) {\n\n    resource function put manage\\-orders/[string orderId](OrderDetail orderDetail) returns\n        http:STATUS_NO_CONTENT|http:STATUS_CREATED {\n        OrderStatus? orderStatus = orderStatuses[orderId];\n        if orderStatus == orderDetail.status {\n            return http:STATUS_NO_CONTENT;\n        } else {\n            orderStatuses[orderId] = orderDetail.status;\n            return http:STATUS_CREATED;\n        }\n    }\n}"
      }
    ]
  },
  "service-activator": {
    "slug": "service-activator",
    "name": "Service Activator",
    "description": "Service activator provides a service that can be invoked via both messaging and non-messaging techniques.",
    "helps": "<p>Ballerina can expose public functions/classes that can be invoked by other Ballerina programs. This allows sharing common logic between services and applications. Such Ballerina packages can be published using Ballerina Central.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessagingAdapter.html",
    "tags": [
      "Service Activator",
      "Request-Reply",
      "Command Message"
    ],
    "category": "Messaging Endpoints",
    "index": 52,
    "icon": "/images/patterns/service-activator.svg",
    "codeFiles": [
      {
        "name": "service-activator.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype Customer record {|\n    string customerId;\n    string customerName;\n    decimal totalEligibleClaimAmount;\n|};\n\ntype ClaimRequest record {|\n    string customerId;\n    string policyNumber;\n    decimal claimAmount;\n    string accidentType;\n    string claimLocation;\n    ClaimDate claimDate;\n|};\n\ntype ClaimDate record {|\n    string year;\n    string month;\n    string day;\n|};\n\ntype Claim record {|\n    *ClaimRequest;\n    \"APPROVED\"|\"REJECTED\"|\"PENDING\" status;\n|};\n\ntype ClaimHistory record {|\n    string customerId;\n    Claim[] claims;\n|};\n\nfinal http:Client claimHistory = check new (\"http://api.claimhistory.firebase.com.balmock.io\");\nfinal http:Client customerDetails = check new (\"http://api.customerdetails.firebase.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    isolated resource function post claim(ClaimRequest claimRequest) returns decimal|error {\n        ClaimHistory claimHostory = check claimHistory->/claims/[claimRequest.customerId]/claims\\.json();\n        Customer customer = check customerDetails->/customers/[claimRequest.customerId]/details\\.json();\n        return calculateClaimAmount(claimRequest, claimHostory, customer.totalEligibleClaimAmount);\n    }\n}\n\nisolated function calculateClaimAmount(ClaimRequest claimRequest, ClaimHistory claimHistory, decimal totalElegibleAmount) returns decimal {\n    decimal totalClaimedAmount = from var {claimAmount, claimDate, status} in claimHistory.claims\n        where claimDate.year == claimRequest.claimDate.year && status == \"APPROVED\"\n        collect sum(claimAmount);\n    decimal remainingAmount = totalElegibleAmount - totalClaimedAmount;\n    return decimal:max(remainingAmount, claimRequest.claimAmount * 0.2);\n}"
      }
    ]
  },
  "message-channel": {
    "slug": "message-channel",
    "name": "Message Channel",
    "description": "Message channel connects one application to another, where one application writes information to the channel and the other one reads.",
    "helps": "<p>Ballerina supports message systems via its rich set of libraries. These libraries have <code>Client</code>s and <code>Listener</code>s to write and read messages.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageChannel.html",
    "tags": [
      "Message Channel",
      "Point-to-Point Channel",
      "Message"
    ],
    "category": "Messaging Systems",
    "index": 0,
    "icon": "/images/patterns/message-channel.svg",
    "codeFiles": [
      {
        "name": "message-channel.bal",
        "language": "ballerina",
        "content": "import ballerina/websocket;\n\nfinal map<websocket:Caller> connectionMap = {};\n\nservice /chat on new websocket:Listener(8080) {\n    resource function get .() returns websocket:Service {\n        return new ChatService();\n    }\n}\n\nservice class ChatService {\n    *websocket:Service;\n\n    remote function onOpen(websocket:Caller caller) returns error? {\n        string newUserConnectionId = caller.getConnectionId();\n        connectionMap[newUserConnectionId] = caller;\n        string message = string `New user joined with connection id: ${newUserConnectionId}`;\n        check broadcaseMessage(message, newUserConnectionId);\n    }\n\n    remote function onMessage(websocket:Caller caller, string chatMessage) returns error? {\n        check broadcaseMessage(chatMessage, caller.getConnectionId());\n    }\n\n    remote function onClose(websocket:Caller caller) returns error? {\n        _ = connectionMap.remove(caller.getConnectionId());\n    }\n}\n\nfunction broadcaseMessage(string message, string senderConnectionId) returns error? {\n    foreach var [connectionId, wsChannel] in connectionMap.entries() {\n        if connectionId != senderConnectionId {\n            check wsChannel->writeMessage(message);\n        }\n    }\n}"
      }
    ]
  },
  "message": {
    "slug": "message",
    "name": "Message",
    "description": "Message is a data record that the messaging system can transmit through a message channel.",
    "helps": "<p>Ballerina is a data-oriented language. It has first-class support for data to be repressed as arrays, maps, records, and tuples. These values can be read and written to message channels.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/Message.html",
    "tags": [
      "Message",
      "Command Message",
      "Document Message",
      "Message Channel"
    ],
    "category": "Messaging Systems",
    "index": 1,
    "icon": "/images/patterns/message.svg",
    "codeFiles": [
      {
        "name": "message.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype SurveyUpdateRequest record {\n    string title;\n    string from_template_id;\n    boolean footer;\n    string folder_id;\n    int theme_id;\n};\n\nfinal http:Client surveyMonkey = check new (\"http://api.surveymonkey.com/v3/surveys\");\n\npublic function main() returns error? {\n    SurveyUpdateRequest message = {\n        title: \"Customer Satisfaction Survey 2023\",\n        from_template_id: \"customer_satisfaction_template_7\",\n        footer: true,\n        folder_id: \"customer_satisfaction\",\n        theme_id: 789\n    };\n    _ = check surveyMonkey->/v3/surveys/[\"1267\"].put(message, targetType = http:Response);\n}"
      }
    ]
  },
  "pipes-and-filters": {
    "slug": "pipes-and-filters",
    "name": "Pipes And Filters",
    "description": "The pipes and Filters pattern divides a larger processing task into a sequence of smaller, independent processing steps (Filters) that are connected by channels (Pipes).",
    "helps": "<p>Ballerina has a query expression syntax that acts as a pipeline of data. Within a query expression, the <code>where</code> clause can be used to filter data. Existing functions can be called within the query expression to compose complex message processing logic.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/PipesAndFilters.html",
    "tags": [
      "Pipes and Filters",
      "Message Filter",
      "Message Channel",
      "Message"
    ],
    "category": "Messaging Systems",
    "index": 2,
    "icon": "/images/patterns/pipes-and-filters.svg",
    "codeFiles": [
      {
        "name": "pipes-and-filters.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype EmployeePerformance record {|\n    string empId;\n    int productivity;\n    int customerSatisfaction;\n    int goalAchievement;\n|};\n\ntype TopPerformer record {|\n    string empId;\n    float performance;\n|};\n\nfinal http:Client firebaseClient = check new (\"http://api.employee.performance.firebase.com.balmock.io\");\n\nservice /api/v1 on new http:Listener(8080) {\n    isolated resource function get employee/top\\-performers(int count) returns TopPerformer[]|error {\n        EmployeePerformance[] employeePerformace = check firebaseClient->/performance\\.json();\n        return from var {empId, productivity, customerSatisfaction, goalAchievement} in employeePerformace\n               let float performance = productivity * 0.3 + customerSatisfaction * 0.1 + goalAchievement * 0.6\n               where performance > 7.5\n               limit count\n               order by performance descending\n               select {empId, performance};\n    }\n}"
      }
    ]
  },
  "message-router": {
    "slug": "message-router",
    "name": "Message Router",
    "description": "Message router consumes a message from one channel and republishes it to a different channel depending on a set of conditions.",
    "helps": "<p>Ballerina supports conditional logic with if-else and match statements.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageRouter.html",
    "tags": [
      "Message Router",
      "Message Channel",
      "Message Endpoint",
      "Message"
    ],
    "category": "Messaging Systems",
    "index": 3,
    "icon": "/images/patterns/message-router.svg",
    "codeFiles": [
      {
        "name": "message-router.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype DhlUkResponse record {|\n    string url;\n    record {|\n        string id;\n        Status status;\n    |}[] shipments;\n|};\n\ntype DhlDpiResponse record {|\n    Status[] events;\n    string publicUrl;\n    string barcode;\n|};\n\ntype Status record {|\n    string statusCode;\n    string status;\n|};\n\nenum Country {\n    UK,\n    DE\n}\n\nfinal http:Client dhl = check new (\"http://api.dhl.com.balmock.io\");\n\nservice /shipments on new http:Listener(8080) {\n\n    resource function get [Country country]/[string trackingNumber]/status() returns string|error {\n        match country {\n            UK => {\n                DhlUkResponse response = check dhl->/parceluk/tracking/v1/shipments(trackingNumber = trackingNumber);\n                return response.shipments[0].status.status;\n            }\n            DE => {\n                DhlDpiResponse response = check dhl->/dpi/tracking/v1/trackings/[trackingNumber];\n                return response.events[0].status;\n            }\n            _ => {\n                return error(\"County not supported\");\n            }\n        }\n    }\n}"
      }
    ]
  },
  "message-translator": {
    "slug": "message-translator",
    "name": "Message Translator",
    "description": "The Message Translator transforms messages from one structure to another.",
    "helps": "<p>Ballerina comes with a data mapper as part of its Visual Studio Code extension, allowing you to effortlessly map data from one record to another.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageTranslator.html",
    "tags": [
      "Message Translator",
      "Message Endpoint"
    ],
    "category": "Messaging Systems",
    "index": 4,
    "icon": "/images/patterns/message-translator.svg",
    "codeFiles": [
      {
        "name": "message-translator.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\npublic type SalesData record {|\n    Customer customer;\n    Oppotunity[] opportunities;\n|};\n\npublic type Customer record {|\n    string id;\n    string name;\n    string email;\n|};\n\npublic type Oppotunity record {|\n    string id;\n    decimal amount;\n    string closeDate;\n|};\n\npublic type QuickBooksInvoice record {|\n    string customerId;\n    Invoice[] invoices;\n|};\n\npublic type Invoice record {|\n    string id;\n    decimal amount;\n    string invoiceDate;\n|};\n\nfinal http:Client quickBooks = check new (\"http://api.quickbooks.com.balmock.io\");\n\nservice /api/v1/analytics on new http:Listener(8080) {\n\n    resource function post sales(SalesData salesData) returns error? {\n        QuickBooksInvoice quickBooksInvoice = translate(salesData);\n        _ = check quickBooks->/v3/company/REALM012/invoice.post(quickBooksInvoice, targetType = http:Response);\n    }\n}\n\nfunction translate(SalesData salesData) returns QuickBooksInvoice {\n    return {\n        customerId: salesData.customer.id,\n        invoices: from var oppotunity in salesData.opportunities\n                  select {\n                      id: oppotunity.id,\n                      amount: oppotunity.amount,\n                      invoiceDate: oppotunity.closeDate\n                  }\n    };\n}"
      }
    ]
  },
  "message-endpoint": {
    "slug": "message-endpoint",
    "name": "Message Endpoint",
    "description": "Message Endpoint is a client of the messaging channel. It abstracts the details of communication to the application.",
    "helps": "<p>Ballerina supports a rich set of libraries that abstract various messaging protocols (such as HTTP, gRPC, and Kafka) and provides a <code>Client</code> interface that acts as a message endpoint.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageEndpoint.html",
    "tags": [
      "Message Endpoint",
      "Message Channel"
    ],
    "category": "Messaging Systems",
    "index": 5,
    "icon": "/images/patterns/message-endpoint.svg",
    "codeFiles": [
      {
        "name": "message-endpoint.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype Currency \"AUD\"|\"INR\"|\"BGP\";\n\nfinal readonly & map<decimal> rates = {\n    \"AUD\": 1.59,\n    \"INR\": 83.24,\n    \"GBP\": 0.83\n};\n\nservice /api/v1/rates on new http:Listener(8080) {\n    isolated resource function get covert(Currency base, Currency target, decimal amount = 1.00) returns decimal {\n        decimal baseUsdValue = rates.get(base);\n        decimal targetUsdValue = rates.get(target);\n        return (targetUsdValue / baseUsdValue) * amount;\n    }\n}"
      }
    ]
  },
  "wire-tap": {
    "slug": "wire-tap",
    "name": "Wire Tap",
    "description": "Wire tap publishes each incoming message unmodified to a secondary channel for inspection and analysis.",
    "helps": "<p>Ballerina has a lightweight concurrency model with built-in syntax support. This helps to send messages to a secondary channel parallelly without blocking the main channel.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/WireTap.html",
    "tags": [
      "Wire Tap",
      "Message Channel",
      "Message Endpoint"
    ],
    "category": "System Management",
    "index": 55,
    "icon": "/images/patterns/wire-tap.svg",
    "codeFiles": [
      {
        "name": "wire-tap.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype SnowflakeRequest record {\n    string statement;\n    string timeout = \"60\";\n    string database = \"messageLog\";\n    string schema = \"message\";\n    string role = \"logger\";\n};\n\ntype StockResponse record {\n    string ParentHandlingUnitUUID;\n    string StockItemUUID;\n    string EWMWarehouse;\n    string HandlingUnitNumber;\n    string ShelfLifeExpirationDate;\n    string CountryOfOrigin;\n};\n\ntype LogLevel \"INFO\"|\"WARNING\"|\"ERROR\";\n\nfinal http:Client sapClient = check new (\"http://api.sap.com.balmock.io\");\nfinal http:Client db = check new (\"http://api.snowflake.com.balmock.io\");\n\nservice /warehouse on new http:Listener(8080) {\n\n    resource function get stock(string parentId, string productId) returns StockResponse|error {\n        StockResponse result = check sapClient->/WarehousePhysicalStockProducts/[parentId]/[productId];\n        worker w returns error? {\n            check wiretap(\"stock\", \"INFO\", result.toString());\n        }\n        return result;\n    }\n}\n\nfunction wiretap(string tableName, LogLevel severity, string message) returns error? {\n    SnowflakeRequest snowflakeRequest = {statement: string `insert into ${tableName} values (${message}, ${severity}))`};\n    json _ = check db->/statements.post(snowflakeRequest);\n}"
      }
    ]
  },
  "message-history": {
    "slug": "message-history",
    "name": "Message History",
    "description": "Message History maintains a list of all components that the message passed through. Every component that processes the message adds one entry to the list.",
    "helps": "<p>Depending on the protocol, Ballerina provides APIs to manipulate message content, including headers.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageHistory.html",
    "tags": [
      "Message History",
      "Message Store",
      "Message Router"
    ],
    "category": "System Management",
    "index": 56,
    "icon": "/images/patterns/message-history.svg",
    "codeFiles": [
      {
        "name": "message-history.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype ReimbursementRequest record {|\n    string employee_id;\n    string reason;\n    string amount;\n|};\n\ntype TraceId record {|\n    string id;\n|};\n\nfinal http:Client internalClient = check new (\"http://api.internal.balmock.io\");\nfinal http:Client logClient = check new (\"http://api.internal-log.balmock.io\");\nconst HISTORY_HEADER = \"x-message-history\";\n\nservice /finance on new http:Listener(8080) {\n    resource function post reimburse(ReimbursementRequest request) returns http:Response|error {\n        http:Response response = check internalClient->post(\"/reimbursements\", request);\n        http:Response outbound = new;\n        outbound.setPayload(check response.getJsonPayload());\n        outbound.statusCode = response.statusCode;\n\n        string traceId = check logAndGetTraceId(request);\n        if response.hasHeader(HISTORY_HEADER) {\n            string existingHeader = check response.getHeader(HISTORY_HEADER);\n            outbound.setHeader(HISTORY_HEADER, existingHeader + \";\" + traceId);\n        } else {\n            outbound.setHeader(HISTORY_HEADER, traceId);\n        }\n        return outbound;\n    }\n}\n\nfunction logAndGetTraceId(anydata message) returns string|error {\n    TraceId traceId = check logClient->post(\"/log_message\", message);\n    return traceId.id;\n}"
      }
    ]
  },
  "message-store": {
    "slug": "message-store",
    "name": "Message Store",
    "description": "Message store captures information about each message in a central location.",
    "helps": "<p>Ballerina can send messages to multiple channels during a single service invocation. Ballerina's concurrency model helps to send messages asynchronously without blocking the main channel. The wildcard binding pattern is used to indicate a 'fire-and-forget' invocation, where the response is not used.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageStore.html",
    "tags": [
      "Message Store",
      "Message Channel",
      "Wire Tap",
      "Message Endpoint",
      "Message"
    ],
    "category": "System Management",
    "index": 57,
    "icon": "/images/patterns/message-store.svg",
    "codeFiles": [
      {
        "name": "message-store.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\n\ntype GeoCodeResponse record {|\n    json results;\n|};\n\nfinal http:Client geoCodingClient = check new (\"http://api.maps.googleapis.com.balmock.io\");\nfinal http:Client firebaseClient = check new (\"http://api.mapsproject.firebase.com.balmock.io\");\n\nservice /api on new http:Listener(8080) {\n\n    resource function get location(string address) returns GeoCodeResponse|error {\n        GeoCodeResponse|error storedGeocode = firebaseClient->/location/[address]/location\\.json();\n        if storedGeocode !is error {\n            return storedGeocode;\n        }\n        GeoCodeResponse geocode = check geoCodingClient->/maps/api/geocode/'json(place = address);\n        var _ = start storeAddress(address, geocode);\n        return geocode;\n    }\n}\n\nfunction storeAddress(string address, GeoCodeResponse geocode) returns error? {\n    _ = check firebaseClient->/location/[address]/location\\.json.put(geocode, targetType = json);\n}"
      }
    ]
  },
  "test-message": {
    "slug": "test-message",
    "name": "Test Message",
    "description": "Assure the health of messaging components by sending test messages. Note: Instead of the original pattern, we have selected a modern version where infrastructure polls for the health of the components.",
    "helps": "<p>Ballerina provides built-in support for creating, propagating(<code>check</code> keyword), and handling errors. Error handling logic can be performed after testing if a given value is an error using the <code>is</code> keyword.</p>\n",
    "link": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/TestMessage.html",
    "tags": [
      "Test Message",
      "Message Filter",
      "Message"
    ],
    "category": "System Management",
    "index": 59,
    "icon": "/images/patterns/test-message.svg",
    "codeFiles": [
      {
        "name": "test-message.bal",
        "language": "ballerina",
        "content": "import ballerina/http;\nimport ballerina/sql;\nimport ballerinax/mysql;\nimport ballerinax/mysql.driver as _;\n\nservice /customer on new http:Listener(8080) {\n    private mysql:Client? db = null;\n    boolean dbConnected = false;\n\n    function init() {\n        mysql:Client|error dbClient = new (\"localhost\", \"admin\", \"adminpass\", \"CUSTOMER\", 3000);\n        if dbClient is mysql:Client {\n            self.db = dbClient;\n            self.dbConnected = true;\n        }\n    }\n\n    resource function get phoneNumber(string id) returns string|http:InternalServerError|http:NotFound|error {\n        mysql:Client? db = self.db;\n        if db !is mysql:Client {\n            return http:INTERNAL_SERVER_ERROR;\n        }\n\n        string|error result = db->queryRow(`SELECT number FROM customers WHERE id = ${id}`);\n        if result is sql:NoRowsError {\n            return http:NOT_FOUND;\n        }\n        return result;\n    }\n\n    resource function get heartbeat() returns http:Ok|http:InternalServerError {\n        return self.dbConnected ? http:OK : http:INTERNAL_SERVER_ERROR;\n    }\n}"
      }
    ]
  }
} as const;
