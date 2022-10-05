export const graphic = {
  type: 'graphic',
  position: 'right',
  title: 'Graphic Section Title',
  text: '**Click to edit! Use MarkDown (commonmark.org/help)! Add Emoticons (getemoji.com)!** 🙂 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquam quam sit amet mi ullamcorper, ut commodo ligula ultricies.',
  button1: 'First Button',
  link1: '#',
  tab1: 'new',
  button2: 'Second Button',
  link2: '#',
  tab2: 'new',
};

export const content = {
  type: 'content',
  title: 'Content Section Title',
  text: '**Click to edit! Use MarkDown (commonmark.org/help)! Add Emoticons (getemoji.com)!** 🙂 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquam quam sit amet mi ullamcorper, ut commodo ligula ultricies.',
  button1: 'First Button',
  link1: '#',
  tab1: 'new',
  button2: 'Second Button',
  link2: '#',
  tab2: 'new',
};

export const iconbox = {
  type: 'iconbox',
  icon1: 'GridView',
  title1: 'First Iconbox',
  text1: '**Click to edit! Use MarkDown (commonmark.org/help)! Add Emoticons (getemoji.com)!** 🙂 Lorem ipsum dolor sit amet.',
  icon2: 'GridView',
  title2: 'Second Iconbox',
  text2: '**Click to edit! Use MarkDown (commonmark.org/help)! Add Emoticons (getemoji.com)!** 🙂 Lorem ipsum dolor sit amet.',
  icon3: 'GridView',
  title3: 'Third Iconbox',
  text3: '**Click to edit! Use MarkDown (commonmark.org/help)! Add Emoticons (getemoji.com)!** 🙂 Lorem ipsum dolor sit amet.',
};

export const cardbox = {
  type: 'cardbox',
  title1: 'First Cardbox',
  text1: '**Click to edit! Use MarkDown (commonmark.org/help)! Add Emoticons (getemoji.com)!** 🙂 Lorem ipsum dolor sit amet.',
  title2: 'Second Cardbox',
  text2: '**Click to edit! Use MarkDown (commonmark.org/help)! Add Emoticons (getemoji.com)!** 🙂 Lorem ipsum dolor sit amet.',
};

export const mailing = {
  type: 'mailing',
  title: 'Mailing Section Title',
  text: '**Click to edit! Use MarkDown (commonmark.org/help)! Add Emoticons (getemoji.com)!** 🙂 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquam quam sit amet mi ullamcorper, ut commodo ligula ultricies.',
  button: 'Subscribe',
  group: 'Group Id',
};

export const selling = {
  type: 'selling',
  title1: 'First Product',
  text1: '**Click to edit! Use MarkDown (commonmark.org/help)! Add Emoticons (getemoji.com)!** 🙂 Lorem ipsum dolor sit amet.',
  button1: 'Buy Now',
  product1: 'First Product',
  currency1: 'USD',
  price1: '10',
  title2: 'Second Product',
  text2: '**Click to edit! Use MarkDown (commonmark.org/help)! Add Emoticons (getemoji.com)!** 🙂 Lorem ipsum dolor sit amet.',
  button2: 'Buy Now',
  product2: 'Second Product',
  currency2: 'USD',
  price2: '20',
};

export const header = {
  type: 'header',
  title: 'Website Title',
  button: 'Header Button',
  link: '#',
  tab: 'new',
};

export const footer = {
  type: 'footer',
  textinfo: 'Copywrite © all rights reserved.',
  textrules: '**Click to edit! Use MarkDown (commonmark.org/help)! Use Policy Privacy Generator (privacypolicygenerator.info)!** This document contains rules and privacy of the website: (your website address). The website administrator is: (your data)',
  titlerules: 'Rules and Privacy',
};

const landing = [
  { ...graphic, id: Math.random().toString(16).slice(2) },
  { ...mailing, id: Math.random().toString(16).slice(2) },
  { ...iconbox, id: Math.random().toString(16).slice(2) },
  { ...content, id: Math.random().toString(16).slice(2) },
];

const product = [
  { ...graphic, id: Math.random().toString(16).slice(2) },
  { ...selling, id: Math.random().toString(16).slice(2) },
  { ...iconbox, id: Math.random().toString(16).slice(2) },
  { ...content, id: Math.random().toString(16).slice(2) },
];

const templates = { landing, product };

export default templates;
