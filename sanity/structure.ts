// structure.js
import { singletonDocumentListItems, filteredDocumentListItems } from 'sanity-plugin-singleton-tools'
import { StructureBuilder, StructureResolverContext } from 'sanity/structure'

export const structure = (S: StructureBuilder, context: StructureResolverContext) =>
    S.list()
        .id('site')
        .items([...singletonDocumentListItems({ S, context }), S.divider(), ...filteredDocumentListItems({ S, context })])
