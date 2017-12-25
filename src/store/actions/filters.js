// @flow
const UPDATE_FILTER = "UPDATE_FILTER"

const updateFilter = (key: "archived" | "status", value: string) => ({
  type: UPDATE_FILTER,
  payload: { key, value }
})

export {
  UPDATE_FILTER,
  updateFilter
}
