import React from "react";

interface ListItemProps {
    email: string;
    name: string;
}
const ListItem = React.memo(({ name, email }: ListItemProps) => {
        return (
            <div className="w-full h-16 bg-primaryBg shadow-xl rounded-lg flex justify-start flex-wrap items-center px-8 text-ellipsis">
                <div className="min-w-[10rem] w-1/2 text-base text-textPrimary text-ellipsis">
                    {name}
                </div>
                <div className="min-w-[10rem] w-1/2 text-base text-textPrimary text-ellipsis">
                    {email}
                </div>
            </div>
        )
    });
export default ListItem;