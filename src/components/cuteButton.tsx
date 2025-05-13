import { SvgIconComponent } from '@mui/icons-material';

interface ICuteButton {
    text?: string,
    icon?: SvgIconComponent,
    onClick?: () => void;
}

export const CuteButton: React.FC<ICuteButton> = ({ text, icon: Icon, onClick }) => {
    return (
        <button onClick={onClick} className="border border-(--gray) p-1.5 rounded-lg inline-flex gap-2 hover:bg-(--aquamarine) transition-all duration-100 cursor-pointer">
          {text && <span className='hover:text-white'>{text}</span>}
          {Icon && <Icon sx={{":hover": { color: "white" }}}/>}
        </button>
      );
}

