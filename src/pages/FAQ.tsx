import FaqModal from "@/components/FAQ/faqModal";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import {
  useDeleteFaqMutation,
  useFaqsQuery,
} from "@/redux/slices/admin/settingApi";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const FAQPage = () => {
  const [open, setOpen] = useState(false);
  const [faqdata, setFaqdata] = useState(null);
  const { data: faqs } = useFaqsQuery({});
  const [deleteFaq] = useDeleteFaqMutation();
  const showModal = () => {
    setOpen(true);
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteFaq(id);

      if (res?.data?.success) {
        alert("FAQ Deleted");
      }
    } catch (err: any) {
      alert(err?.message);
    }
  };
  const showEditModal = (offer: any) => {
    setFaqdata(offer);
    setOpen(true);
  };
  return (
    <div>
      <Title className="mb-6">FAQ</Title>
      <div className="flex justify-end mb-5">
        <Button onClick={showModal}>
          <Plus />
        </Button>
      </div>
      {faqs?.data?.map((ques: any, index: number) => (
        <div key={index} className="bg-base mb-2 p-2 rounded">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">
              {index + 1}.{ques.question}
            </h2>
            <div className="flex items-center gap-2 justify-end">
              <button
                onClick={() => showEditModal(ques)}
                className="text-primary"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => handleDelete(ques?._id)}
                className="text-red-500"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          <p className="mt-2 text-lg bg-gray-100 rounded p-2">{ques.answer}</p>
        </div>
      ))}
      <FaqModal open={open} setOpen={setOpen} faqData={faqdata} />
    </div>
  );
};

export default FAQPage;
