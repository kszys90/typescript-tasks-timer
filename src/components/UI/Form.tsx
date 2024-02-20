import { type FormEvent, type ComponentPropsWithoutRef, forwardRef } from "react"
import React from 'react'

export type FormHandle = {
    clear: () => void
}

type FormProps = ComponentPropsWithoutRef<'form'> & {
    onSave: (value: unknown) => void
}

const Form = forwardRef<FormHandle, FormProps>(function Form({ onSave, children, ...otherProps }: FormProps, ref) {
    const form = React.useRef<HTMLFormElement>(null)

    React.useImperativeHandle(ref, () => {
        return {
            clear() {
                form.current?.reset()
            }
        }
    })

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData)
        onSave(data)
    }
    return (
        <form onSubmit={handleSubmit}{...otherProps} ref={form}        >
            {children}
        </form>
    )
})
export default Form
