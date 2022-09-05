export function mapObjectToUpdateQuery(object: any, offset = 2) {
  const objectColumns = Object.keys(object.object)
    .map((key, index) => `"${key}"=$${index + offset}`)
    .join(",");
  const objectValues = Object.values(object.object);
  return { objectColumns, objectValues };
}
