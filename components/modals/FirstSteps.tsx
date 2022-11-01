import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';

import { StepData, IFieldHandler, StepElement, Step, UserProfileLinks } from '@/components/modals/FirstSteps.types';
import { actionCreators } from '@/store/base/index';
import Axios from '@/utils/axios';
import Modal from '@/components/Modal';
import Input from '@/components/form/Input';
import Textarea from '@/components/form/Textarea';
import Firework from '@/components/elems/Firework';

const FirstSteps: React.FC = () => {
  const dispatch = useDispatch();

  const authManagement = useSelector(state => state.auth);

  const [data, setData] = useState<StepData>({
    ignore: false,
    verified: false,
    title: '',
    description: '',
    country: '',
    town: '',
    links: [],
  });
  const [currentStep, useCurrentStep] = useState<number>(0);
  const [fireworkIsActive, useFireworkIsActive] = useState<boolean>(false);

  useEffect(() => {
    const ignoreLocalStorage: boolean = localStorage.getItem('ignore')
      ? JSON.parse(localStorage.getItem('ignore'))
      : false;

    if ((authManagement?.data?.profile ? Object.keys(authManagement.data.profile).length > 1 : false)
      || authManagement?.data?.profile?.ignore === true
      || ignoreLocalStorage) return;
    if (authManagement?.token) {
      dispatch(actionCreators.modalToggle(
        {
          name: 'first-steps',
          toggle: true,
        }
      ));

      dispatch(actionCreators.backdropToggle(true));
    }
  }, [authManagement]);

  const fieldHandler = (name: string, value: string): IFieldHandler => {
    const [state, field, subfield] = name.split('.');

    return {
      state,
      field,
      subfield,
      value,
    };
  };

  const setValue = (field: string, value: string): void => {
    const data = fieldHandler(field, value);

    if (data.subfield) {
      if (data.field === 'links') {
        const linkItem: UserProfileLinks = {
          type: 'social',
          title: data.subfield,
          url: data.value,
        };

        setData(prevState => ({
          ...prevState,
          links: mergeLinks(prevState.links, linkItem),
        }));
      }
    }
    else {
      setData(prevState => ({
        ...prevState,
        [data.field]: value,
      }));
    }
  };

  const mergeLinks = (prevLinks: Array<UserProfileLinks>, newLink: UserProfileLinks) => {
    const links = [newLink];

    for (const link of prevLinks) {
      if (link.title !== newLink.title) links.push(link);
    }

    return links;
  };

  const elementsHasValue = (elements: Array<StepElement>): boolean => {
    if (elements && elements.length > 0) {
      return elements.every(elem => {
        const [, name] = elem.name.split('.');
        return (elem.required === true ? String(data[name]) !== '' : true);
      });
    }
  };

  const steps: Array<Step> = [
    {
      title: 'What should be the name of your seller profile?',
      lead: 'E.g. Tyler Kicks, Chris Plug etc.',
      elements: [
        {
          required: true,
          elem: 'input',
          name: 'data.title',
          title: 'Title',
        },
      ],
    },
    {
      title: 'Please write a few words about your offer',
      lead:'E.g. My offer includes mainly limited edition Jordan 1 models.',
      elements: [
        {
          required: true,
          elem: 'textarea',
          name: 'data.description',
          title: 'Description',
        },
      ],
    },
    {
      title: 'Please enter your location',
      elements: [
        {
          required: true,
          elem: 'input',
          name: 'data.country',
          title: 'Country',
        },
        {
          required: false,
          elem: 'input',
          name: 'data.town',
          title: 'Town',
        },
      ],
    },
    {
      title: 'If you have a social network site (where you deal with resell), please link it.',
      lead: 'If customers see this, they will trust you better.',
      elements: [
        {
          required: false,
          elem: 'input',
          name: 'data.links.instagram',
          title: 'Instagram username',
        },
        {
          required: false,
          elem: 'input',
          name: 'data.links.grailed',
          title: 'Grailed username',
        },
      ],
    },
  ];

  const progressBarLine = (): number => {
    const width: number = 0;
    return width + 25 * currentStep;
  };

  const progressBarStyle = {
    width: `${progressBarLine()}%`,
  };

  const finish = async () => {
    useCurrentStep(4);

    setTimeout(() => useFireworkIsActive(true), 1000);
    setTimeout(() => useFireworkIsActive(false), 3000);

    localStorage.setItem('ignore', 'true');

    try {
      await Axios.post('/user/profile', {
        ...data,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
    } catch (err) {
      console.error('err', err);
    }
  };

  const exit = () => {
    dispatch(actionCreators.modalToggle(
      {
        name: 'first-steps',
        toggle: false,
      }
    ));

    dispatch(actionCreators.backdropToggle(false));
  }

  const later = async () => {
    exit();

    if (currentStep < 4) {
      localStorage.setItem('ignore', 'true');

      try {
        await Axios.post('/user/profile', {
          ignore: true,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
      } catch (err) {
        console.error('err', err);
      }
    }
  };

  const openNewAd = () => {
    Router.push('/new-ad');
    exit();
  };

  if (!authManagement?.token) return null;
  return (
    <Modal
      name="first-steps"
      content={
        <div className="container block__container">
          <div className="block__content">
            <div className="block__title">
              Welcome to the HypeBold community!
            </div>
            <p className="block__lead">
              Thank you for joining us.
            </p>
            {currentStep !== 4 && (
              <p className="block__description">
                Please take a minute to get started and set up your own sales profile.
              </p>
            )}
            <div className="block__form">
              {steps.length > 0 && (
                <div className="step step--form">
                  <div className="step__progressbar">
                    <div
                      className="step__progressbar-line"
                      style={progressBarStyle}
                    />
                  </div>
                  {steps.map((step, index) => {
                    return (
                      <div
                        className={`step__item ${currentStep === index ? 'is-active' : ''}`}
                        key={index}
                      >
                        <h4 className="step__title">
                          {step.title}
                        </h4>
                        {step.lead && (
                          <p className="step__lead">
                            {step.lead}
                          </p>
                        )}
                        <div className="step__content">
                          {step.elements.length > 0 && (
                            <>
                              {step.elements.map((elem, key) => {
                                return (
                                  <div
                                    className="step__field"
                                    key={key}
                                  >
                                    {elem.elem === 'input' && (
                                      <Input
                                        type="text"
                                        name={elem.name}
                                        title={elem.title}
                                        value={data[elem.name]}
                                        onChange={setValue.bind(this)}
                                      />
                                    )}

                                    {elem.elem === 'textarea' && (
                                      <Textarea
                                        name={elem.name}
                                        title={elem.title}
                                        value={data[elem.name]}
                                        onChange={setValue.bind(this)}
                                      />
                                    )}
                                  </div>
                                )
                              })}
                            </>
                          )}
                          <div className="step__actions">
                            {index !== (steps.length - 1) && (
                              <button
                                className="btn btn-primary w-100"
                                disabled={!elementsHasValue(step.elements)}
                                onClick={() => useCurrentStep(index + 1)}
                              >
                                Next
                              </button>
                            )}
                            {index === (steps.length - 1) && (
                              <button
                                className="btn btn-primary w-100"
                                disabled={!elementsHasValue(step.elements)}
                                onClick={() => finish()}
                              >
                                Finish
                              </button>
                            )}
                            {index > 0 && (
                              <p
                                className="step__link-previous"
                                onClick={() => useCurrentStep(index - 1)}
                              >
                                Back
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div className={`step__item ${currentStep === 4 ? 'is-active' : ''}`}>
                    {fireworkIsActive && (
                      <Firework />
                    )}
                    <h4 className="step__title">
                      Your profile is ready to use. 🚀
                    </h4>
                    <p className="step__sublead">
                      It's time to
                    </p>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => openNewAd()}
                    >
                      Sell your first item
                    </button>
                  </div>
                </div>
              )}
            </div>
            {currentStep === 0 && (
              <div className="block__bottom">
                <span
                  className="block__action"
                  onClick={() => later()}
                >
                  Later
                </span>
              </div>
            )}
          </div>
        </div>
      }
    />
  );
}

export default FirstSteps;
