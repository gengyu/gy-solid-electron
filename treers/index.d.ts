export = treer

// type StructureType = {
//     [prop: string]: (string | StructureType) []
// }

declare function treer(pathlike: string): treer.Structure

declare namespace treer {
    class Structure{
        [prop: string]: (string | treer.Structure) []
    }
}
