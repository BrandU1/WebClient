import CircularProgress from "@mui/material/CircularProgress";

const LoadingProgress = () => {
  return (
    <div className="w-screen h-[55vh] flex items-center justify-center">
      <CircularProgress size={50} sx={{ color: "#0CABA8" }} />
    </div>
  );
};

export default LoadingProgress;
