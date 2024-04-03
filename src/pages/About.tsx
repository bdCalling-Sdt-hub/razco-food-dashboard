import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

const About = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

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
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default About;
