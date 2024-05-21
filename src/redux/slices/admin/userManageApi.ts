import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const userManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `user`,
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
      providesTags: [tagTypes.status],
    }),

    updateUserStatus: build.mutation({
      query: (data) => ({
        url: `user/active-deactive/${data?._id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.status],
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserStatusMutation } =
  userManagementApi;
