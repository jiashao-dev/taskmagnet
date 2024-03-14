export default function Page() {
    return (
        <form>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    required
                    aria-required
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
                    name="due-date"
                    required
                    aria-required
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
        </form>
    );
}