import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const coverApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCover: build.mutation({
      query: (coverData) => ({
        url: `banner/create-banner`,
        method: "POST",
        body: coverData,
      }),
      invalidatesTags: [tagTypes.cover],
    }),
    getCovers: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `banner`,
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
      providesTags: [tagTypes.cover],
    }),
    updateCover: build.mutation({
      query: ({ id, formData }) => ({
        url: `/banner/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: [tagTypes.cover],
    }),
    deleteCover: build.mutation({
      query: (id) => ({
        url: `banner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.cover],
    }),
  }),
});

export const {
  useCreateCoverMutation,
  useGetCoversQuery,
  useDeleteCoverMutation,
  useUpdateCoverMutation,
} = coverApi;
