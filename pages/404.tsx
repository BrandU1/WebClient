import Image from "next/image";

function Error() {
  return (
    <div className="flex justify-center py-3">
      <Image src="/dummy/404.png" width={700} height={600} alt="404" />
    </div>
  );
}
export default Error;
