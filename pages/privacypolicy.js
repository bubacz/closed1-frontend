import dynamic from "next/dynamic";

const FileViewer = dynamic(
    () => {
      return import("react-file-viewer");
    },
    { ssr: false }
  );
  
const file = "https://res.cloudinary.com/closedone/raw/upload/v1614156619/Documents/yvxumt6hx5lthe9hkzla.docx"
const type = "docx";

const PrivacyPolicy = props => <FileViewer fileType={type} filePath={file} />;

export default PrivacyPolicy;
