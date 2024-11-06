import  { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const form = useRef();

  const sendEmail = e => {
    e.preventDefault();
    alert('Mail sent successfully');

    emailjs
      .sendForm('service_qkdrcht', 'template_tn66ht3', form.current, {
        publicKey: 'l6yk3x0wUGI018t6s',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        error => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] bg-gray-100 p-4">
      
      {/* Project Team Members Heading */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>

      <div className="flex flex-col md:flex-row h-auto md:h-[400px] w-full md:w-4/5 lg:w-3/5 bg-white rounded-lg shadow-md mb-8">
        
        {/* Left card (image) */}
        <div
          className="flex flex-1 rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dmbkmxijw/image/upload/v1729824270/contact2_mmbpho.png')",
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Right card (form) */}
        <div className="flex flex-1 flex-col justify-center p-10 bg-white rounded-b-lg md:rounded-r-lg md:rounded-bl-none">
          <form ref={form} onSubmit={sendEmail} className="w-full">
            
            <label className="block font-semibold mb-1 mt-2">Name</label>
            <input
              type="text"
              name="from_name"
              className="w-full mb-3 p-2 border border-gray-300 rounded"
            />

            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email_id"
              className="w-full mb-3 p-2 border border-gray-300 rounded"
            />

            <label className="block font-semibold mb-2">Message</label>
            <textarea
              name="message"
              cols="15"
              rows="4"
              className="w-full mb-3 p-2 border border-gray-300 rounded"
            />

            <input
              type="submit"
              value="Send"
              className="bg-green-600 text-white py-2 px-4 rounded cursor-pointer w-full mt-1 mb-4 hover:bg-green-700 transition-colors text-sm md:text-base"
            />
          </form>
        </div>
      </div>
      
      {/* Team Members Cards */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Project Team Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-4/5 lg:w-3/5 mb-8">
        {['Anjili', 'Lokeswari', 'Prabhakar', 'Mallesh', 'Venkat Reddy'].map(member => (
          <div key={member} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-110 transition-transform duration-200 cursor-pointer">
            <img
              src={`https://via.placeholder.com/100?text=${member.charAt(0)}`}
              alt={`${member}`}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700">{member}</h3>
          </div>
        ))}
      </div>

      {/* Contact Form and Image */}
    
    </div>
  );
};

export default Contact;
