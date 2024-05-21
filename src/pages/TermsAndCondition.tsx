import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { useCreateTermsConditionsMutation } from "@/redux/slices/admin/settingApi";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";

const TermsAndCondition = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [createTermsConditions, { isLoading, data, isSuccess, error }] =
    useCreateTermsConditionsMutation();
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        alert("Terms and conditions add Successfully");
      }
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        // message.error(errorData.data.message);
        alert(errorData.data.message);
      } else {
        console.error("Login error:", error);
      }
    }
  }, [data, error, isSuccess]);
  const handleCreate = async () => {
    try {
      await createTermsConditions({ content });
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <Title className="mb-4">Terms and condition</Title>
      <JoditEditor
        ref={editor}
        value={content}
        config={{ height: 600 }}
        onBlur={(newContent) => setContent(newContent)}
      />
      <div className="flex justify-end mt-5">
        <Button onClick={handleCreate}>Save Changes</Button>
      </div>
    </div>
  );
};

export default TermsAndCondition;
