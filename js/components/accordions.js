const accordionsContainer = document.querySelector(".accordions__container");

const accordionsData = [
  {
    titel: "  About",
    bodytext:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. A et exercitationem quo asperiores voluptas optio! Rerum quae incidunt, ametanimi architecto unde. Similique alias suscipit eius saepe distinctio deleniti doloribus.",
  },
  {
    titel: "  Collaborate",
    bodytext:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. A et exercitationem quo asperiores voluptas optio! Rerum quae incidunt, ametanimi architecto unde. Similique alias suscipit eius saepe distinctio deleniti doloribus.",
  },
  {
    titel: "  Commission",
    bodytext:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. A et exercitationem quo asperiores voluptas optio! Rerum quae incidunt, ametanimi architecto unde. Similique alias suscipit eius saepe distinctio deleniti doloribus.",
  },
  {
    titel: "  Materials",
    bodytext:
      " A et exercitationem quo asperiores voluptas optio!Lorem ipsum dolor sit amet consectetur adipisicing elit. A et exercitationem quo asperiores voluptas optio! Rerum quae incidunt, ametanimi architecto unde. Similique alias suscipit eius saepe distinctio deleniti doloribus.",
  },
  {
    titel: "  Tools",
    bodytext:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. A et exercitationem quo asperiores voluptas optio! Rerum quae incidunt, ametanimi architecto unde. Similique alias suscipit eius saepe distinctio deleniti doloribus.",
  },
];

accordionsData.forEach(({ titel, bodytext }) => {
  accordionsContainer.insertAdjacentHTML(
    "beforeend",
    `
        <details name="requirements" class="accordion">
        <summary class="accordion__heading">${titel}</summary>
        <p class="accordion__content">${bodytext}</p>
    </details>
    `,
  );
});
