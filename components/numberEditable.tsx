import { useState, useRef, useEffect } from "react";
import { Input, NumberInput, NumberInputField } from "@chakra-ui/react";

interface IProps {
  numericValue: number | string;
  displayValue: string;
  handleChangeInput: (valueAsString: string, valueAsNumber: number) => void;
  handleOnBlur: React.FocusEventHandler;
}
/**
 * Utility function to provide 'editable' raw numbers and still show localized currency
 * @param param0
 */
const NumberEditable = ({
  numericValue,
  displayValue,
  handleChangeInput,
  handleOnBlur,
}: IProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isEditing]);

  return (
    <>
      {isEditing ? (
        <NumberInput
          value={numericValue}
          onBlur={(e) => {
            setIsEditing(false);
            handleOnBlur(e);
          }}
          onChange={handleChangeInput}
          style={{ visibility: isEditing ? "visible" : "hidden" }}
        >
          <NumberInputField ref={inputRef} textAlign="right" />
        </NumberInput>
      ) : (
        <Input
          value={displayValue}
          isReadOnly={true}
          onFocusCapture={() => setIsEditing(true)}
          style={{ visibility: isEditing ? "hidden" : "visible" }}
          textAlign="right"
        />
      )}
    </>
  );
};

export default NumberEditable;
