import React from "react";

export const SitemapIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>((props, ref) => {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <path
          d="M21 16H17C16.4477 16 16 16.4477 16 17V21C16 21.5523 16.4477 22 17 22H21C21.5523 22 22 21.5523 22 21V17C22 16.4477 21.5523 16 21 16Z"
          fill="#C5E7B1"
        />
        <path
          d="M21 16H17C16.4477 16 16 16.4477 16 17V21C16 21.5523 16.4477 22 17 22H21C21.5523 22 22 21.5523 22 21V17C22 16.4477 21.5523 16 21 16Z"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7 16H3C2.44772 16 2 16.4477 2 17V21C2 21.5523 2.44772 22 3 22H7C7.55228 22 8 21.5523 8 21V17C8 16.4477 7.55228 16 7 16Z"
          fill="#E0FFCF"
        />
        <path
          d="M7 16H3C2.44772 16 2 16.4477 2 17V21C2 21.5523 2.44772 22 3 22H7C7.55228 22 8 21.5523 8 21V17C8 16.4477 7.55228 16 7 16Z"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14 2H10C9.44772 2 9 2.44772 9 3V7C9 7.55228 9.44772 8 10 8H14C14.5523 8 15 7.55228 15 7V3C15 2.44772 14.5523 2 14 2Z"
          fill="#E0FFCF"
        />
        <path
          d="M14 2H10C9.44772 2 9 2.44772 9 3V7C9 7.55228 9.44772 8 10 8H14C14.5523 8 15 7.55228 15 7V3C15 2.44772 14.5523 2 14 2Z"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5 16V13C5 12.7348 5.10536 12.4804 5.29289 12.2929C5.48043 12.1054 5.73478 12 6 12H18C18.2652 12 18.5196 12.1054 18.7071 12.2929C18.8946 12.4804 19 12.7348 19 13V16M12 12V8"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        ref={ref}
        viewBox="0 0 24 24"
        {...props}
      >
        <rect width="6" height="6" x="16" y="16" rx="1"></rect>
        <rect width="6" height="6" x="2" y="16" rx="1"></rect>
        <rect width="6" height="6" x="9" y="2" rx="1"></rect>
        <path d="M5 16v-3a1 1 0 011-1h12a1 1 0 011 1v3M12 12V8"></path>
      </svg> */}
    </>
  );
});
