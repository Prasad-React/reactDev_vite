
import React from "react"
import data from "../sitedata.json";
import colors from "../styles/colors";

export default function Header() {
  return (

    <>
    <div className=" bg-[linear-gradient(180deg,#568106ff,transparent)] flex flex-col items-center justify-center py-3 bg-cover bg-center"   >
    
      {data.Header.map((item, index) => (
        <div
          key={index}
          className="container flex flex-row items-center justify-center gap-8 flex-wrap"
        >
          {/* Logos on the left */}
          <div className="flex flex-row items-center gap-10 text-left">
            {item.img1?.map((img, i) => (
              <a
                key={i}
                href={img.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <img
                  src={img.imgsrc}
                  alt={img.imgalt}
                  width={100}
                  height={100}
                  className="mx-auto"
                /> */}
              </a>
            ))}
          </div>

          {/* Headings on the right */}
          <div className="flex flex-col items-center gap-2 text-center" >
            <h4 className="text-2xl  flex-center font-bold" style={{ color: colors.bgColor12 }}>{item.header}</h4>
            <h3 className="text-3xl font-bold" style={{ color: colors.bgColor13 }}>{item.heading}</h3>
          </div>
        </div>
      ))}

      
    </div>

     {/* <div className="relative overflow-hidden w-full h-[50px]">
    <div className="gif-truck-animation">
      <Image 
         src={menuData.Navbar[0].imgsrc} 
         alt="Truck"
        width={70}
        height={30}
      />
    </div>
  </div> */}
</>
    
  );
}


