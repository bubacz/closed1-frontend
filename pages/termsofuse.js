import dynamic from "next/dynamic";

const FileViewer = dynamic(
    () => {
      return import("react-file-viewer");
    },
    { ssr: false }
  );
  
const file = "https://res.cloudinary.com/closedone/raw/upload/v1614155148/Documents/srlh88gmvuxl8fc9jl4w.docx";
const type = "docx";

const TermsOfUse = () => <FileViewer fileType={type} filePath={file} />;
  
export default TermsOfUse;
