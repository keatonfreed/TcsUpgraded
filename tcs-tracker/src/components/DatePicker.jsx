import React, { useEffect, useRef, useState } from "react"
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import './DatePicker.css'
import { usePopper } from "react-popper";
// import * as dateFns from 'date-fns';
import { format } from 'date-fns';



export default function DatePicker({ defaultDate = new Date(), onDateSelect }) {

    const [selected, setSelected] = useState(defaultDate);
    const [inputValue, setInputValue] = useState(
        defaultDate ? format(defaultDate, 'MM-dd-yyyy') : ''
    );
    const [isPopperOpen, setIsPopperOpen] = useState(false);

    // const popperRef = useRef(null);
    const buttonRef = useRef(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(buttonRef.current, popperElement, {
        placement: "bottom-start",
    });

    const handleDaySelect = (date) => {
        setSelected(date);
        if (date) {
            setInputValue(format(date, "MM-dd-yyyy"));
        } else {
            setInputValue("");
        }
        onDateSelect(date); // Call the onDateSelect callback with the selected date
    };


    const handleInputClick = () => {
        setTimeout(() => setIsPopperOpen(true), 0);
    };

    const handleInputBlur = () => {
    setTimeout(() => {
            if (
                document.activeElement !== buttonRef.current &&
                popperElement && !popperElement.contains(document.activeElement)
            ) {
                setIsPopperOpen(false);
            }
        }, 0);
    };


    // Inside your useEffect hook
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                buttonRef.current !== event.target &&
                popperElement && !popperElement.contains(event.target)
            ) {
                setIsPopperOpen(false);
            }
        };

        const handleFocusIn = (event) => {
            if (
                popperElement && !popperElement.contains(event.target)
            ) {
                setIsPopperOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('focusin', handleFocusIn);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('focusin', handleFocusIn);
        };
    }, [popperElement]);

    return (
        <div>
            <div>
                <input
                    className="datePicker"
                    ref={buttonRef}
                    size={12}
                    type="text"
                    placeholder="Select a date"
                    value={inputValue}
                    onMouseDown={handleInputClick}
                    onFocus={handleInputClick}
                    onBlur={handleInputBlur}
                    readOnly
                />
            </div>
            {isPopperOpen && (
                <div
                    tabIndex={-1}
                    style={styles.popper}
                    className="datePickerContainer"
                    {...attributes.popper}
                    ref={setPopperElement}
                    role="dialog"
                    aria-label="DayPicker calendar"
                    onMouseDown={e => e.stopPropagation()}
                >
                    <DayPicker
                        mode="single"
                        defaultMonth={selected}
                        selected={selected}
                        onSelect={handleDaySelect}
                        required
                    />
                </div>
            )}
        </div>
    );
}
