import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const subCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSubCategory: build.mutation({
      query: (categoryData) => ({
        url: `subcategory/create-subcategory`,
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: [tagTypes.subCategory],
    }),
    getSubCategories: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `subcategory`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: any) => {
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.subCategory],
    }),
    updateSubCategory: build.mutation({
      query: ({ id, formData }) => ({
        url: `/subcategory/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: [tagTypes.subCategory],
    }),
    deleteSubCategory: build.mutation({
      query: (id) => ({
        url: `subcategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.subCategory],
    }),
  }),
});

export const {
  useCreateSubCategoryMutation,
  useGetSubCategoriesQuery,
  useDeleteSubCategoryMutation,
  useUpdateSubCategoryMutation,
} = subCategoryApi;
