import React from 'react';

type Props = {
  html: string;
};

export default function RawHtml({html}: Props) {
  return <div dangerouslySetInnerHTML={{__html: html}} />;
}
