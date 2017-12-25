// @flow

import {
  ARCHIVED,
  UNARCHIVED,
  ALL,
  ACTIVE,
  TODO,
  COMPLETE,
  ABANDONED,
  NONE
} from "./../utils/filters"

export type FiltersType = {
  status:
    | typeof ALL
    | typeof NONE
    | typeof ACTIVE
    | typeof TODO
    | typeof COMPLETE
    | typeof ABANDONED,
  archived: typeof ALL | typeof ARCHIVED | typeof UNARCHIVED
}
