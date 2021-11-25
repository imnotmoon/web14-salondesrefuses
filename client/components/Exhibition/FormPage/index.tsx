import React, { useRef } from 'react';
import styled from '@emotion/styled';

import LabelInput from '../LabelInput';
import { Input, TextArea, ThumbnailBox } from '../style';
import Preview from './Preview/Preview';
import { HoldExhibition } from '../types';
import addIcon from '@public/icons/add.png';

interface OldInputData {
    title: string;
    startAt: Date;
    endAt: Date;
    theme: string;
    collaborator: string;
    description: string;
    thumbnail: string | null;
}
interface FormProps {
    formInput: HoldExhibition;
    oldInputData?: OldInputData | undefined;
}

const index = ({ formInput, oldInputData }: FormProps) => {
    const thumbnailRef = useRef<HTMLInputElement>(null);

    const {
        startAt,
        endAt,
        thumbnail,
        onChangeTitleInput,
        onChangeStartAt,
        onChangeEndAt,
        onChangeTheme,
        onChangeCollaborator,
        onChangeDescription,
        onChangeThumbnail,
    } = formInput;
    const { title, theme, collaborator, description } = oldInputData || formInput;
    return (
        <Container>
            <LabelInput label="전시회 제목" require>
                <Input type="text" placeholder="제목을 입력해주세요." value={title} onChange={onChangeTitleInput} />
            </LabelInput>
            <LabelInput label="기간" require>
                <Input
                    type="date"
                    placeholder="전시회 시작 일자"
                    value={startAt.toString().slice(0, 10)}
                    onChange={onChangeStartAt}
                />
                <Label>부터</Label>
                <Input
                    type="date"
                    placeholder="전시회 종료 일자"
                    value={endAt.toString().slice(0, 10)}
                    onChange={onChangeEndAt}
                />
                <Label>까지</Label>
            </LabelInput>
            <LabelInput label="테마">
                <Input type="type" placeholder="전시회의 느낌을 작성해보세요!" value={theme} onChange={onChangeTheme} />
            </LabelInput>
            <LabelInput label="카테고리">
                <Input type="type" placeholder="카테고리를 작성해주세요." />
            </LabelInput>
            <LabelInput label="협업">
                <Input
                    type="type"
                    placeholder="작품을 만드는데 도움을 주신 분을 작성해주세요!"
                    value={collaborator}
                    onChange={onChangeCollaborator}
                />
            </LabelInput>
            <LabelInput label="설명">
                <TextArea placeholder="설명을 작성해주세요!" value={description} onChange={onChangeDescription} />
            </LabelInput>
            <LabelInput label="전시회 썸네일" require>
                <ThumbnailBox onClick={() => thumbnailRef.current!.click()}>
                    {thumbnail ? <Preview image={thumbnail} /> : <Placeholder src={addIcon.src} />}
                </ThumbnailBox>
                <Input
                    ref={thumbnailRef}
                    type="file"
                    name="thumbnail"
                    hidden
                    onChange={() => {
                        onChangeThumbnail(thumbnailRef.current);
                    }}
                />
            </LabelInput>
        </Container>
    );
};

const Container = styled.div`
    width: calc(100% - 530px);
    margin-right: 60px;

    & > div {
        margin-bottom: 40px;
    }
`;

const Label = styled.label`
    font: ${(props) => props.theme.font.textBase};
`;

const Placeholder = styled.img`
    width: 50px;
    height: 50px !important;
    cursor: pointer;
`;

export default index;
