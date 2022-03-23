const transformIconName = (iconName: string): string => {
    return iconName.charAt(0).toUpperCase() + iconName.slice(1);
} 

export const transformIconPass = (iconPass: string[]): string => {
    let pass = '';
    iconPass.forEach((iconName,index) => {
        const transformedIconName = transformIconName(iconName);
        if(index === iconPass.length - 1) {
            pass += `${transformedIconName}`;
        } else {
            pass += `${transformedIconName}_`
        }
    });

    return pass;
};