import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  return (
    <div className="bg-primary h-20 flex items-center justify-between pr-10">
      <div></div>
      <div>
        <Popover>
          <PopoverTrigger asChild className="focus:border cursor-pointer">
            <Avatar>
              <AvatarImage
                src="https://xsgames.co/randomusers/avatar.php?g=female"
                alt="Profile"
              />
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-36 p-1">
            <h2 className="text-center">Mr.Admin</h2>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
