import { Component } from '@nestjs/common';

@Component()
export class QueryBuilderService {

    prepare(query: any, queryParams: object): void {
        for (const p in queryParams) {
            if (queryParams.hasOwnProperty(p)) {
                console.log('p', queryParams[p]);
                if (p.toLowerCase() === 'sort') {
                    const criteria = queryParams[p].split(' ');
                    const dir = criteria[1].toLowerCase();
                    console.log('dir', dir);
                    const field = criteria[0];
                    console.log('field', field);
                    query.sort(dir === 'asc' ? '+' + field : '-' + field);
                }
            }
        }
    }
}