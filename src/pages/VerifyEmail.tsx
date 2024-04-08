import AuthWrapper from "@/components/share/AuthWrapper";
import Title from "@/components/share/Title";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const onChange = (text: any) => {
    console.log("onChange:", text);
  };
  const sharedProps = {
    onChange,
  };
  const handleVerify = () => {
    navigate("/auth/set-new-password");
  };
  return (
    <AuthWrapper>
      <div className="text-center mb-12">
        <Title>Check your email</Title>
        <p>
          We sent a reset link to {"fahim"} enter 5 digit code that mentioned in
          the email
        </p>
      </div>

      <Input.OTP
        size="large"
        className="otp-input"
        style={{ width: "100%", height: "50px" }}
        length={5}
        formatter={(str) => str.toUpperCase()}
        {...sharedProps}
      />
      <Button
        className="bg-secondary h-12 text-white text-lg w-full mt-14"
        onClick={handleVerify}
      >
        Verify Code
      </Button>

      <p className="text-center mt-10">
        You have not received the email?
        <Button className="pl-0" type="link">
          Resend
        </Button>
      </p>
    </AuthWrapper>
  );
};

export default VerifyEmail;
