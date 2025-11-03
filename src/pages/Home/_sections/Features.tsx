// import React, { useEffect, useRef, useState } from "react";
// import { featuresList } from "../../../utils/featuresList";
// import "./HomeSections.scss";

// const Features = () => {
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!sectionRef.current) return;

//       const section = sectionRef.current;
//       const sectionTop = section.offsetTop;
//       const sectionHeight = section.offsetHeight;
//       const windowHeight = window.innerHeight;
//       const scrollY = window.scrollY;

//       // Calculate when the section starts and ends being visible
//       const startOffset = sectionTop - windowHeight;
//       const endOffset = sectionTop + sectionHeight;

//       // Scroll progress within the section [0–1]
//       const progress = Math.max(
//         0,
//         Math.min(1, (scrollY - startOffset) / (endOffset - startOffset))
//       );
//       setScrollProgress(progress);
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll(); // Initial check

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <section className="features_section" ref={sectionRef}>
//       <style>
//         {`
//           .svg-path-base {
//             fill:  #37838c69;
//           }
//           /* Smooth gradient stop transition */
//           stop {
//             transition: offset 0.3s ease-out;
//           }
//         `}
//       </style>

//       <div className="bg_img_container">
//         <div className="bg_img_1">
//           <img src="/home/section-background-1.svg" alt="" />
//         </div>
//         <div className="bg_img_2">
//           <img src="/home/section-background-2.svg" alt="" />
//         </div>
//         <div className="bg_img_3">
//           <img src="/home/section-background-3.svg" alt="" />
//         </div>
//       </div>

//       <div className="bg_lines">
//         {featuresList.map((feature, i) => {
//           // Individual progress for each SVG based on its index
//           const individualProgress = Math.max(
//             0,
//             Math.min(1, (scrollProgress - i * 0.2) * 2)
//           );

//           return (
//             <div className={`bg_line bg_line_${i + 1}`} key={i}>
//               <div className="feature_card_container">
//                 <div className="feature_content">
//                   <h2>Before Capturing</h2>
//                   <h1>Quotation Manager</h1>
//                   <p>
//                     Build professional quotations in minutes. Include multiple
//                     event details, deliverables, packages, and pricing – then
//                     send for instant online approval.
//                   </p>
//                 </div>
//                 <div className="feature_card">
//                   <img src="/home/forget_pass_img.png" alt="" />
//                   <h2>Scene 1: New client approaches</h2>
//                   <div>
//                     <p>
//                       A bride or groom, a couple, or an event organizer reaches
//                       out for a quotation
//                     </p>
//                     <p>
//                       Within minutes, you prepare a quotation that includes
//                       event details, deliverables and pricing. You send it off
//                       for instant approval.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {i % 2 === 1 ? (
//                 <svg
//                   width="478"
//                   height="394"
//                   viewBox="0 0 478 394"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M471.239 393.68L477.056 375.888C477.347 374.985 477.58 374.074 477.731 373.16C482.874 342.049 409.632 292.473 308.268 223.849C237.791 176.133 150.07 116.744 56.8818 42.7019C43.3924 31.9801 32.0673 21.555 22.9897 11.4972C19.5319 7.66467 16.4003 3.89105 13.5933 0.181367C8.8676 2.43832 4.44652 4.76955 0.331675 7.17004C2.46764 10.7505 4.94499 14.3946 7.73682 18.0995C17.9033 31.584 32.401 45.8291 51.0203 60.6184C144.212 134.668 231.929 194.049 302.405 241.771C396.943 305.761 467.012 353.204 471.861 384.538L471.86 384.543C472.204 386.81 472.221 388.985 471.868 391.081C471.728 391.944 471.518 392.817 471.246 393.676L471.239 393.68Z"
//                     fill="#37848C"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   width="456"
//                   height="414"
//                   viewBox="0 0 456 414"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <defs>
//                     {/* Vertical gradient for top-to-bottom fill */}
//                     <linearGradient
//                       id={`grad-${i}`}
//                       x1="0"
//                       y1="0"
//                       x2="0"
//                       y2="1"
//                     >
//                       <stop
//                         offset={`${individualProgress * 100}%`}
//                         stopColor="#37848C"
//                       />
//                       <stop
//                         offset={`${individualProgress * 100}%`}
//                         stopColor="transparent"
//                       />
//                     </linearGradient>
//                   </defs>

//                   {/* Base outline */}
//                   <path
//                     className="svg-path-base"
//                     d="M8.14209 413.151L1.50575 395.649C1.1723 394.76 0.896683 393.861 0.702341 392.955C-5.92191 362.133 64.1789 309.48 161.195 236.601C228.65 185.925 312.608 122.854 401.261 44.9211C414.093 33.6362 424.797 22.7413 433.293 12.3104C436.529 8.33584 439.445 4.43417 442.042 0.610375C446.834 2.65758 451.327 4.79213 455.521 7.00907C453.581 10.6748 451.307 14.4189 448.724 18.2372C439.319 32.1348 425.661 46.9795 407.948 62.5461C319.292 140.486 235.337 203.55 167.884 254.231C77.3999 322.191 10.3364 372.575 7.07594 404.055L7.07775 404.06C6.84875 406.337 6.93871 408.508 7.39139 410.585C7.5723 411.44 7.82332 412.302 8.13533 413.148L8.14209 413.151Z"
//                   />

//                   {/* Animated fill */}
//                   <path
//                     d="M8.14209 413.151L1.50575 395.649C1.1723 394.76 0.896683 393.861 0.702341 392.955C-5.92191 362.133 64.1789 309.48 161.195 236.601C228.65 185.925 312.608 122.854 401.261 44.9211C414.093 33.6362 424.797 22.7413 433.293 12.3104C436.529 8.33584 439.445 4.43417 442.042 0.610375C446.834 2.65758 451.327 4.79213 455.521 7.00907C453.581 10.6748 451.307 14.4189 448.724 18.2372C439.319 32.1348 425.661 46.9795 407.948 62.5461C319.292 140.486 235.337 203.55 167.884 254.231C77.3999 322.191 10.3364 372.575 7.07594 404.055L7.07775 404.06C6.84875 406.337 6.93871 408.508 7.39139 410.585C7.5723 411.44 7.82332 412.302 8.13533 413.148L8.14209 413.151Z"
//                     fill={`url(#grad-${i})`}
//                   />
//                 </svg>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default Features;

// import { featuresData } from "../../../utils/HomeFeatures";
import { featuresList } from "../../../utils/featuresList";
import "./HomeSections.scss";

const Features = () => {
  return (
    <section className="features_section">
      <div className="bg_img_container">
        <div className="bg_img_1">
          <img src="/home/section-background-1.svg" alt="" />
        </div>
        <div className="bg_img_2">
          <img src="/home/section-background-2.svg" alt="" />
        </div>
        <div className="bg_img_3">
          <img src="/home/section-background-3.svg" alt="" />
        </div>
        <div className="bg_img_4 d-lg-none">
          <img src="/home/section-background-4.svg" alt="" />
        </div>
      </div>

      <div className="bg_lines">
        {featuresList.map((feature, i) => {
          return (
            <div className={`bg_line bg_line_${i + 1}`} key={i}>
              <div className="feature_card_container">
                <div className="feature_content">
                  <h2>Before Capturing</h2>
                  <h1>Quotation Manager</h1>
                  <p>
                    Build professional quotations in minutes. Include multiple
                    event details, deliverables, packages, and pricing - then
                    send for instant online approval.
                  </p>
                </div>
                <div className="feature_card">
                  <img src="/home/forget_pass_img.png" alt="" />
                  <h2>Scene 1: New client approaches</h2>
                  <div>
                    <p>
                      A bride or groom, a couple, or an event organizer reaches
                      out for a quotation
                    </p>
                    <p>
                      Within minutes, you prepare a quotation that includes
                      event details, deliverables and pricing. You send it off
                      for instant approval.
                    </p>
                  </div>
                </div>
              </div>

              <div dangerouslySetInnerHTML={{ __html: feature.line || "" }} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
