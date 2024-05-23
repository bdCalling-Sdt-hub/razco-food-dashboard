import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import {
  useCreatePrivacyPolicyMutation,
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
} from "@/redux/slices/admin/settingApi";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [createPrivacy, { isLoading }] = useCreatePrivacyPolicyMutation();
  const [updatePrivacy] = useUpdatePrivacyPolicyMutation();
  const { data: termsData } = useGetPrivacyPolicyQuery<Record<string, any>>({});

  const handlePrivacy = async () => {
    try {
      if (termsData?.data?.data?.content) {
        const res = await updatePrivacy({ content });
        // console.log(res);
        if (res?.data?.success) {
          toast.success("Update successful");
        }
      } else {
        const res = await createPrivacy({ content });
        if (res?.data?.success) {
          toast.success("Create successful");
        }
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <div>
      <Title className="mb-4">Privacy Policy</Title>
      <JoditEditor
        ref={editor}
        value={termsData?.data?.data?.content}
        config={{ height: 600 }}
        onBlur={(newContent) => setContent(newContent)}
      />
      <div className="flex justify-end mt-5">
        <Button onClick={handlePrivacy}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
