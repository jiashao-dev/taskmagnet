import { SubmitButton } from "../../../components/SubmitButton";
import { addTask } from "./_actions/taskAction";

export default function Page() {
    return (
        <form action={addTask}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    // required
                    // aria-required
                />
                <label htmlFor="title">error title</label>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" rows={3} cols={50} />
                <label htmlFor="description">error description</label>
            </div>
            <div>
                <label htmlFor="due-date">Due date</label>
                <input
                    id="due-date"
                    type="date"
                    name="dueDate"
                />
                <label htmlFor="due-date">error due-date</label>
            </div>
            <fieldset>
                <legend>Priority</legend>
                <div>
                    <div>
                        <input
                            id="low-priority"
                            type="radio"
                            name="priority"
                            value={"low"}
                            defaultChecked
                        />
                        <label htmlFor="low-priority">Low</label>
                    </div>
                    <div>
                        <input
                            id="medium-priority"
                            type="radio"
                            name="priority"
                            value={"medium"}
                        />
                        <label htmlFor="medium-priority">Medium</label>
                    </div>
                    <div>
                        <input
                            id="high-priority"
                            type="radio"
                            name="priority"
                            value={"high"}
                        />
                        <label htmlFor="high-priority">
                            High
                        </label>
                    </div>
                </div>
            </fieldset>
            <div>
                <label htmlFor="category">Category</label>
                <select id="category" name="category" defaultValue={"personal"}>
                    <option disabled>Select category</option>
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="home">Home</option>
                </select>
            </div>
            <div>
                <label htmlFor="tag">Tag</label>
                <input
                    id="tag"
                    type="text"
                    name="tag"
                />
            </div>
            <SubmitButton title="Add Task" />
        </form>
    );
}