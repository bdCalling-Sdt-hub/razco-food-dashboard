import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const settingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPrivacyPolicy: build.mutation({
      query: (policyData) => ({
        url: `rules/privacy-policy`,
        method: "POST",
        body: policyData,
      }),
      invalidatesTags: [tagTypes.policy],
    }),
    createTermsConditions: build.mutation({
      query: (policyData) => ({
        url: `rules/terms-and-conditions`,
        method: "POST",
        body: policyData,
      }),
      invalidatesTags: [tagTypes.terms],
    }),
    createAboutUs: build.mutation({
      query: (policyData) => ({
        url: `rules/about`,
        method: "POST",
        body: policyData,
      }),
      invalidatesTags: [tagTypes.about],
    }),
    getPrivacyPolicy: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `rules/privacy-policy`,
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
      providesTags: [tagTypes.policy],
    }),
    getAboutUs: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `rules/about`,
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
      providesTags: [tagTypes.about],
    }),
    getTermsConditions: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `rules/terms-and-conditions`,
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
      providesTags: [tagTypes.terms],
    }),
    myProfile: build.query({
      query: () => {
        return {
          url: `user/profile`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.profile],
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: `user/profile-update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    changePassword: build.mutation({
      query: (userData) => ({
        url: `auth/change-password`,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: [tagTypes.password],
    }),
  }),
});

export const {
  useCreatePrivacyPolicyMutation,
  useGetPrivacyPolicyQuery,
  useCreateTermsConditionsMutation,
  useGetTermsConditionsQuery,
  useCreateAboutUsMutation,
  useGetAboutUsQuery,
  useMyProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = settingApi;
