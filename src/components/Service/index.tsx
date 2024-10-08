import { Disclosure } from '@headlessui/react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { getService } from '../../libs/utils/get-service'
import { Helmet } from 'react-helmet-async'
import { useGetServiceQuery } from '../../store/web/strapi.api'

export interface IServiceProps {
  id: string
}

const Service: React.FC<IServiceProps> = ({ id }) => {
  const service_ = getService(id)
  const { data, isLoading, isError, isSuccess, error } = useGetServiceQuery(id)
  const service = {
    Title: data?.data[0].attributes.Title,
    TabTitle: data?.data[0].attributes.TabTitle,
    Meta: data?.data[0].attributes.Meta,
    Tabs: data?.data[0].attributes.Tabs.data.map((item) => item.attributes),
    Description: data?.data[0].attributes.Description,
  }

  return (
    <>
      <Helmet>
        <meta name="description" content={service?.Meta} />
        <title>{service?.TabTitle}</title>
      </Helmet>
      <section id="Service" className="relative mb-8 mt-8 flex justify-center p-4 md:mt-16">
        <div className="container relative">
          <Link
            to="/services"
            className="absolute -top-16 right-0 mt-4 w-fit border-2 border-white bg-blue_dark/80 px-2 py-1 text-lg text-white transition-all duration-300 hover:border-blue_light"
          >
            Вернуться к списку услуг
          </Link>
          <h1 className="text-xl text-blue_light lg:ml-[0.17rem]">{service?.Title}</h1>
          <h3
            className="mb-16 text-2xl sm:text-4xl lg:text-6xl"
            dangerouslySetInnerHTML={{ __html: service?.Description! }}
          />
          {service?.Tabs?.map((item, index) => {
            return (
              <Disclosure key={item.Title} defaultOpen={index === 0}>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={clsx(
                        open
                          ? 'bg-blue_dark hover:bg-blue_dark/60'
                          : 'bg-blue_dark/60 hover:bg-blue_dark',
                        'mb-2 flex w-full justify-between px-4 py-2 text-left text-lg text-white transition-all duration-300 focus:outline-none'
                      )}
                    >
                      <span>{item.Title}</span>
                      {open ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
                          />
                        </svg>
                      )}
                    </Disclosure.Button>
                    <Disclosure.Panel className="text mb-4 px-4 pb-2 pt-4 text-gray-900">
                      {item.Tables.map((tableH) => {
                        return (
                          <div key={tableH.Title}>
                            <span className="font-medium">{tableH.Title}</span>
                            <table className="mb-2 w-full">
                              <tbody>
                                {tableH.Row.map((row, index) => {
                                  return (
                                    <tr
                                      className="w-full border-b border-blue_dark"
                                      key={row.Description + index}
                                    >
                                      {row.Description && (
                                        <td
                                          className="w-3/4 border-r border-blue_dark p-2"
                                          dangerouslySetInnerHTML={{ __html: row.Description! }}
                                          rowSpan={
                                            tableH.Row[index + 1]?.Description === ''
                                              ? tableH.Row.length
                                              : 1
                                          }
                                        />
                                      )}
                                      <td className="w-1/4 p-2">{row.Price}</td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        )
                      })}
                      <span className="font-medium">{item.Trailer}</span>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            )
          })}
          {isLoading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-25 backdrop-blur-[5px]">
              <div className="h-24 w-24 animate-spin rounded-full border-8 border-solid border-blue_light border-t-transparent"></div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Service
