import Image from "next/image";

export default function OrderStackImage() {
  return (
    <div className="relative w-40 h-48">

      {/* Back */}
      <div className="absolute top-4 left-6 w-full h-full rotate-6">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWU_PEmieL5Hubkwej0rQT590jeUCYg3rXKtFG65E_yX6IP-um3Vm2ejqwhFkkPz1vYucUVtr7v-kZUYUogO8_nRTU4covoy4FsFFfhUQgeL84_xEaEXN-EUCuLfJg6c_89DocGARL8eGYed0cvHoZkETZdSKHSWRcrw2SwiN6gx4jrExcz-juIlGDhBGaDalf5R8GLHOzUYiKjVkeT_Tc5xHnb5oUP2Vh6ro8YLS-Eb2WMYDyUSXImA7QTcNIxmyUDcEZwyJa43I"
          alt="book"
          fill
          className="object-cover rounded"
        />
      </div>

      {/* Middle */}
      <div className="absolute top-2 left-3 w-full h-full rotate-3">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWLj3xO6gBmWxwN31rsewvWOON7fqYmR7R_UslmxirlNw61g3nhhd456y-gDNC6YOa4dFtInlDgGExM_wOcVmIEax1pU8mbJ8KMhcBklq_vh9tgnm0BCYsHFGwVYIbBW0UIIj1kvXixFnqPmH94bJ0VhZ_7jdDmwuJXq02k-hleYP2SXhjQAlxCtSqBMqtb8Yp7Xywpl2MaxawVcxkk016XcQWZd4WGSswgmfcUaVvicryGrxx1qQ-WUett_2vRBrNFKYAca6VARI"
          alt="book"
          fill
          className="object-cover rounded"
        />
      </div>

      {/* Front */}
      <div className="absolute top-0 left-0 w-full h-full z-10">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlTnB7LQx0KlZNM3GDoqwxWwzFI0ZfGtNzhHBPBWn-bI_C20lKu3dUUVOHc-YRYwQcKbHA_7mqcrMcMBRXHtz25fFXKosxLKK0XNPr8YbJ0ek2wE8iPeUSVzG-R8s5rmIOygczm5hnMfz5CozH2pG3Tqnv8CfEDMsnbyHTIA0StT2ffoTUaVi8HFW0yCtaqQve2Lqo3SvUsNEnCQrUxpZrtYvnMcJXGzSsK5ErrHiRDj65zGC-ScUDAImJevs1DznR_cAraoIqDYY"
          alt="book"
          fill
          className="object-cover rounded"
        />
      </div>

    </div>
  );
}