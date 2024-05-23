import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import {
  useCreateTermsConditionsMutation,
  useGetTermsConditionsQuery,
  useUpdateTermsConditionsMutation,
} from "@/redux/slices/admin/settingApi";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const TermsAndCondition = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [createTermsConditions] = useCreateTermsConditionsMutation();
  const [updateTermsConditions] = useUpdateTermsConditionsMutation();
  const { data: termsData } = useGetTermsConditionsQuery<Record<string, any>>(
    {}
  );
  useEffect(() => {
    if (termsData?.data?.data?.content) {
      setContent(termsData.data.data.content);
    }
  }, [termsData]);
  const handleCreate = async () => {
    try {
      if (termsData?.data?.data?.content) {
        const res = await updateTermsConditions({ content });
        // console.log(res);
        if (res?.data?.success) {
          toast.success("Update successful");
        }
      } else {
        const res = await createTermsConditions({ content });
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
      <Title className="mb-4">Terms and condition</Title>
      <JoditEditor
        ref={editor}
        value={content}
        config={{ height: 600 }}
        onBlur={(newContent) => {
          setContent(newContent);
        }}
      />
      <div className="flex justify-end mt-5">
        <Button onClick={handleCreate}>Save Changes</Button>
      </div>
    </div>
  );
};

export default TermsAndCondition;
