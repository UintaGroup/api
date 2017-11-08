import { Component } from '@nestjs/common';

@Component()
export class QueryBuilderService {

    prepare(query: any, queryParams: object): void {
        try {
            for (const p in queryParams) {
                if (queryParams.hasOwnProperty(p)) {
                    const params: any = queryParams[p];
                    switch (p.toLowerCase()) {
                        case 'sort':
                            const criteria = params.split(' ');
                            query.sort(criteria[1].toLowerCase() === 'asc' ? '+' + criteria[0] : '-' + criteria[0]);
                        case 'status':
                            if (params.indexOf('active') === 0) {
                                query.where('active')
                                    .equals(params === 'active');
                            } else {
                                try {
                                    query.where('status')
                                        .equals(params);
                                } catch (err) {
                                    console.error(err);
                                }
                            }
                    }
                }
            }
        } catch (err) {
            // swallow
        }
    }
}