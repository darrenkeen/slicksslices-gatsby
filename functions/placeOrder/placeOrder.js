const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your recent order for ${total}</h2>
    <p>Please get over here soon!</p>
    <ul>
      ${order
        .map(
          (item) =>
            `<li>
            <img src="${item.thumbnail}" alt="${item.name}" />
            ${item.size} ${item.name} - ${item.price}
          </li>`
        )
        .join('')}
    </ul>
    <p>Your total is <strong>${total}</strong></p>
  </div>
  <style>
    ul {
      list-style: none;
    }
  </style>
  `;
}

const auth = {
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,
};
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth,
});

function wait(ms = 0) {
  return new Promise((res, rej) => {
    setTimeout(res, ms);
  });
}

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  if (body.tryharder) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'No entry, ERROR: 3138' }),
    };
  }

  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops!, you are missing the ${field} field`,
        }),
      };
    }
  }

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Oops!, you forgot to add some pizzas`,
      }),
    };
  }

  const info = await transporter.sendMail({
    from: 'Slicks Slices <slick@example.com>',
    to: `${body.name} <${body.email}>orders@example.com`,
    subject: 'New Order',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'success' }),
  };
};
