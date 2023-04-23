import { useState, useEffect } from 'react';

import Script from 'next/script';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import getObjectKeyByValue from '../../helpers/getObjValue';

let specialPhoneInput = '';

function MyForm() {
  const [fNameHasError, setFNameHasError] = useState(false);
  const [lNameHasError, setLNameHasError] = useState(false);
  const [emailHasError, setEmailHasError] = useState(false);
  const [phoneHasError, setPhoneHasError] = useState(false);

  const [phoneErrorMessage, setPhoneErrorMessage] = useState(
    'Please, enter correct phone number',
  );

  const namesRegEx = /^[a-z]{2,}$/i;
  const emailRegEx = /^.+@.+\..+$/i;

  const formHandler = (event) => {
    event.preventDefault();

    let formHasError = false;

    const providedName = event.target[0].value;
    const providedSecondName = event.target[1].value;
    const providedEmail = event.target[2].value;
    const providedPhone = specialPhoneInput.getNumber();

    if (!namesRegEx.test(providedName)) {
      setFNameHasError(true);
      formHasError = true;
    } else {
      setFNameHasError(false);
    }

    if (!namesRegEx.test(providedSecondName)) {
      setLNameHasError(true);
      formHasError = true;
    } else {
      setLNameHasError(false);
    }

    if (!emailRegEx.test(providedEmail)) {
      setEmailHasError(true);
      formHasError = true;
    } else {
      setEmailHasError(false);
    }

    if (!specialPhoneInput.isValidNumber()) {
      const providedPhoneError = getObjectKeyByValue(
        // eslint-disable-next-line no-undef
        intlTelInputUtils.validationError,
        specialPhoneInput.getValidationError(),
      );

      if (providedPhoneError === 'TOO_SHORT') {
        setPhoneErrorMessage('Provided number is too short');
      } else if (providedPhoneError === 'TOO_LONG') {
        setPhoneErrorMessage('Provided number is too long');
      } else {
        setPhoneErrorMessage('Please, enter correct phone number');
      }
      setPhoneHasError(true);
      formHasError = true;
    } else {
      setPhoneHasError(false);
    }

    if (formHasError) {
      return;
    }

    console.log(providedName, providedSecondName, providedEmail, providedPhone);
  };

  useEffect(() => {
    function getIp(callback) {
      fetch('https://ipinfo.io/json?token=91c508ecb14026', {
        headers: { Accept: 'application/json' },
      })
        .then((resp) => resp.json())
        .catch(() => ({
          country: 'us',
        }))
        .then((resp) => {
          callback(resp.country);
        });
    }

    const phoneInputField = document.getElementById('phoneNumber');
    specialPhoneInput = window.intlTelInput(phoneInputField, {
      initialCountry: 'auto',
      geoIpLookup: getIp,
      preferredCountries: ['gb', 'tw', 'ua', 'at', 'us'],
      utilsScript:
        'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
    });
  }, []);

  return (
    <>
      <Form className=" col-12 col-sm-6" onSubmit={formHandler}>
        <Form.Group className="mb-3 mt-3" controlId="firstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            placeholder="First name"
            className={fNameHasError ? 'border-danger' : ''}
          />
          {!fNameHasError && (
            <Form.Text className="text-muted">
              Please, enter your first name
            </Form.Text>
          )}
          {fNameHasError && (
            <Form.Text className="text-danger">
              Please, enter atleast 2 symbols
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3 mt-3" controlId="lastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            placeholder="Last name"
            className={lNameHasError ? 'border-danger' : ''}
          />
          {!lNameHasError && (
            <Form.Text className="text-muted">
              Please, enter your last name
            </Form.Text>
          )}
          {lNameHasError && (
            <Form.Text className="text-danger">
              Please, enter atleast 2 symbols
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3 mt-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            placeholder="Email"
            type="email"
            className={emailHasError ? 'border-danger' : ''}
          />
          {!emailHasError && (
            <Form.Text className="text-muted">
              Please, enter your email
            </Form.Text>
          )}
          {emailHasError && (
            <Form.Text className="text-danger">
              Please, enter correct email
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="phoneNumber">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="tel"
            className={phoneHasError ? 'border-danger' : ''}
          />
          {!phoneHasError && (
            <Form.Text className="text-muted">
              Please, enter your phone number
            </Form.Text>
          )}
          {phoneHasError && (
            <Form.Text className="text-danger">{phoneErrorMessage}</Form.Text>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js"
        strategy="beforeInteractive"
      />
    </>
  );
}

export default MyForm;
