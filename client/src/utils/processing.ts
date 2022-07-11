export const getFaceImagesCategoriesWithLabels = (
  faceImagesCategories: GA.ImageCategoryBase[]
) => {
  return faceImagesCategories.reduce(
    (
      acc: { faceImagesWithLabels: GA.ImageCategoryBase[] },
      faceImagesCategory: GA.ImageCategoryBase
    ) => {
      acc.faceImagesWithLabels.push({
        ...faceImagesCategory,
        label: faceImagesCategory.category.replace("Faces", ""),
      });
      return acc;
    },
    { faceImagesWithLabels: [] }
  );
};
