export const contactDetails={
 email:'israeladebolaolashore@gmail.com',
 phone:'+234 706 547 9137',
 whatsapp:'2347065479137',
 github:'https://github.com/israelolashore',
 linkedin:'https://www.linkedin.com/in/israel-adebola-olashore-1a0b19428',
};
export function makeEnquiryLinks({name='',email='',type='Not sure yet',message=''}){
 const body=`Hi Israel,\n\nI’m ${name.trim()}. I’d like to discuss a project.\n\nProject type: ${type}\n${email.trim()?`Email: ${email.trim()}\n`:''}\n${message.trim()}`;
 return {
  whatsapp:`https://wa.me/${contactDetails.whatsapp}?text=${encodeURIComponent(body)}`,
  email:`mailto:${contactDetails.email}?subject=${encodeURIComponent(`Project enquiry: ${type}`)}&body=${encodeURIComponent(body)}`,
 };
}
