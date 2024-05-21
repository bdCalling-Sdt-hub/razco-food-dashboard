import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { useCreatePrivacyPolicyMutation } from "@/redux/slices/admin/settingApi";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [createPrivacy, { isLoading, data, isSuccess, error }] =
    useCreatePrivacyPolicyMutation();
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        alert("Policy add Successfully");
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
  const handlePrivacy = async () => {
    try {
      await createPrivacy({ content });
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <Title className="mb-4">Privacy Policy</Title>
      <JoditEditor
        ref={editor}
        value={content}
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
