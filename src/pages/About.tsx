import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import {
  useCreateAboutUsMutation,
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
} from "@/redux/slices/admin/settingApi";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const About = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [createAboutUs, { isLoading, data, isSuccess, error }] =
    useCreateAboutUsMutation();
  const { data: aboutData } = useGetAboutUsQuery<Record<string, any>>({});
  const [updateAboutUs] = useUpdateAboutUsMutation();
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
      if (aboutData?.data?.data?.content) {
        const res = await updateAboutUs({ content });

        if (res?.data?.success) {
          toast.success("Update successful");
        }
      } else {
        const res = await createAboutUs({ content });
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
      <Title className="mb-4">About</Title>
      <JoditEditor
        ref={editor}
        value={aboutData?.data?.data?.content}
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
