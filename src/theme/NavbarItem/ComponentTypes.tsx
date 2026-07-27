import type {ComponentType} from 'react';
import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';

import ExploreNavbarItem from '@site/src/components/ExploreNavbarItem';

const extendedComponentTypes = {
  ...ComponentTypes,
  'custom-exploreMenu': ExploreNavbarItem as ComponentType<unknown>,
};

export default extendedComponentTypes;
