import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { useCreateAboutUsMutation } from "@/redux/slices/admin/settingApi";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";

const About = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [createAboutUs, { isLoading, data, isSuccess, error }] =
    useCreateAboutUsMutation();
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        alert("About us add Successfully");
      }
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;

        alert(errorData.data.message);
      } else {
        console.error("Login error:", error);
      }
    }
  }, [data, error, isSuccess]);
  const handleCreate = async () => {
    try {
      await createAboutUs({ content });
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <Title className="mb-4">About</Title>
      <JoditEditor
        ref={editor}
        value={content}
        config={{ height: 600 }}
        onBlur={(newContent) => setContent(newContent)}
      />
      <div className="flex justify-end mt-5">
        <Button onClick={handleCreate}>
          {isLoading ? "Saving.." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default About;
