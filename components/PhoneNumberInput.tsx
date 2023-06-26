import styles from '../src/styles/PhoneNumberEnter.module.css'

interface PhoneNumberInputProps{
  phoneNumberRef1:React.RefObject<HTMLInputElement>,
  phoneNumberRef2:React.RefObject<HTMLInputElement>,
  isSignUp:boolean
}


export default function PhoneNumberInput({phoneNumberRef1, phoneNumberRef2, isSignUp}:PhoneNumberInputProps) {
  return (
    <div className={styles["input-wrapper"]}>
      <label htmlFor="phoneNumber">{isSignUp ?  "Your phone number:" : "The phone number of your target:" } </label>
      <div className={styles["phone-number-wrapper"]}>
        <input
          name="phoneNumber"
          id="phoneNumber"
          type="tel"
          placeholder="01234"
          pattern="[0-9]{5}"
          required
          className={styles["phone-number-input"]}
          ref={phoneNumberRef1}
        />
        <input
          name="phoneNumber"
          id="phoneNumber"
          type="tel"
          placeholder="567890"
          pattern="[0-9]{6}"
          required
          className={styles["phone-number-input"]}
          ref={phoneNumberRef2}
        />
      </div>
    </div>

  )
}
