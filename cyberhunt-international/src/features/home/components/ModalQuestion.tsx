import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";

import question from "../../../assets/buttons/QuestionMarkButton.png"

interface ModalQuestionProps{
	description: string;
	title: string;

}

const ModalQuestion = ({ title= "HOLA",description="HOLA" }: ModalQuestionProps) => (
	<Dialog.Root>

		<Dialog.Trigger asChild>
			<button className="inline-flex h-[35px] items-center justify-center   px-[15px] font-medium leading-none text-violet11  outline-offset-1 focus-visible:outline-2 focus-visible:outline-violet6 select-none">
				<img src={question} alt="Question Mark Button" />
			</button>
		</Dialog.Trigger>

		<Dialog.Portal>
			<Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow z-10" /> {/*fondo cuando se pone detras del modal*/}
			<Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow z-20"
            
            >
				<Dialog.Title className="m-0 text-[17px] font-medium text-mauve12 font-sourceCodeFont text-base">
					{title}
				</Dialog.Title>
				<Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11 font-sourceCodeFont">
					{description}
				</Dialog.Description>
				
				
				<div className="mt-[25px] flex justify-end">
					
				</div>
				<Dialog.Close asChild>
					<button
						className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 bg-gray3 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
						aria-label="Close"
					>
						<Cross2Icon />
					</button>
				</Dialog.Close>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
);

export default ModalQuestion;
