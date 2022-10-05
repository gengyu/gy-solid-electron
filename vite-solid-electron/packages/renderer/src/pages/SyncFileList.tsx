import { createSignal, mapArray } from "solid-js";
import { Box } from "@suid/material/Box";
import List from "@suid/material/List";
import ListItem from "@suid/material/ListItem";
import ListItemButton from "@suid/material/ListItemButton";
import Divider from "@suid/material/Divider";
import ListItemIcon from "@suid/material/ListItemIcon";
import DraftsIcon from "@suid/icons-material/Drafts";
import InboxIcon from "@suid/icons-material/Inbox";
import ListItemText from "@suid/material/ListItemText";
import useTheme from "@suid/material/styles/useTheme";
import treers from "treers";
import { isString } from "lodash";


export function SyncFileList() {
    const [pathlike, setPathlike] = createSignal('111');
    const [structure, setStructure] = createSignal<treers.Structure>({});
    const onclick =async ()=>{
        const dirname = await window.electronAPI.openFileTree()
        console.log(dirname,111)
        if(dirname){
            // setStructure(dirname)
            Object.keys(dirname).map(dirnameElement => {
                if(isString(dirnameElement)){

                }

            });

        }
    }
    const theme = useTheme();

    return <>
        <h3>{ pathlike }</h3>
        <div>
            <button onclick={onclick}>打开文件</button>
        </div>
        <Box
            sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: theme.palette.background.paper,
            }}
        >
            <nav aria-label="main mailbox folders">
                <List>
                    {
                        // mapArray
                        // dirList.map(item=>{
                        //     return   <ListItem disablePadding>
                        //         <ListItemButton>
                        //             <ListItemIcon>
                        //                 <InboxIcon />
                        //             </ListItemIcon>
                        //             <ListItemText primary="Inbox" />
                        //         </ListItemButton>
                        //     </ListItem>
                        // })
                    }


                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inbox" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Drafts" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
            <Divider />
            <nav aria-label="secondary mailbox folders">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary="Trash" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton<"a">
                            component="a"
                            href="#simple-list"
                            target="none"
                            onClick={(event) => event.preventDefault()}
                        >
                            <ListItemText primary="Spam" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    </>
}
