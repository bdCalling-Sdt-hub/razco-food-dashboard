import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation({
      query: (categoryData) => ({
        url: `category/create-category`,
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    getCategorys: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `category`,
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
      providesTags: [tagTypes.category],
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategorysQuery,
  useDeleteCategoryMutation,
} = categoryApi;
