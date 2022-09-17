export const graphic = {
  type: 'graphic',
  title: 'Graphic Section Title',
  text: 'Click to edit! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquam quam sit amet mi ullamcorper, ut commodo ligula ultricies. Maecenas aliquet gravida augue sed condimentum.',
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
  text: 'Click to edit! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquam quam sit amet mi ullamcorper, ut commodo ligula ultricies. Maecenas aliquet gravida augue sed condimentum.',
  button1: 'First Button',
  link1: '#',
  tab1: 'new',
  button2: 'Second Button',
  link2: '#',
  tab2: 'new',
};

export const iconbox = {
  type: 'iconbox',
  icon1: 'Settings',
  title1: 'First Iconbox',
  text1: 'Click to edit! Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  icon2: 'Settings',
  title2: 'Second Iconbox',
  text2: 'Click to edit! Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  icon3: 'Settings',
  title3: 'Third Iconbox',
  text3: 'Click to edit! Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

export const mailing = {
  type: 'mailing',
  title: 'Mailing Section Title',
  text: 'Click to edit! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquam quam sit amet mi ullamcorper, ut commodo ligula ultricies. Maecenas aliquet gravida augue sed condimentum.',
  button: 'Subscribe',
  group: 'Group Id',
};

export const selling = {
  type: 'selling',
  title1: 'First Product',
  text1: 'Click to edit! Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  button1: 'Buy Now',
  product1: 'First Product',
  currency1: 'USD',
  price1: '10',
  title2: 'Second Product',
  text2: 'Click to edit! Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  button2: 'Buy Now',
  product2: 'Second Product',
  currency2: 'USD',
  price2: '20',
  title3: 'Third Product',
  text3: 'Click to edit! Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  button3: 'Buy Now',
  product3: 'Third Product',
  currency3: 'USD',
  price3: '30',
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
  textrules: 'This document contains rules and privacy of the website: (your website address). The website administrator is: (your data)',
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

const about = [
  {
    ...content,
    id: Math.random().toString(16).slice(2),
    layout: { variant: 'wide', quantity: '2' },
  },
  {
    ...graphic,
    id: Math.random().toString(16).slice(2),
    layout: { variant: 'wide', position: 'left', quantity: '2' },
  },
  {
    ...graphic,
    id: Math.random().toString(16).slice(2),
    layout: { variant: 'wide', position: 'right', quantity: '2' },
  },
  {
    ...iconbox,
    id: Math.random().toString(16).slice(2),
    layout: { variant: 'wide', quantity: '3' },
  },
];

const templates = { landing, product, about };

export default templates;
